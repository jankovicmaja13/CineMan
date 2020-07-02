import { Component, OnInit } from '@angular/core';
import { Series } from 'src/app/model/series.model';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { SeriesService } from 'src/app/services/series/series.service';
import { ShowModalComponent } from '../show-modal/show-modal.component';
import { Subscription } from 'rxjs';
import { Rating } from 'src/app/model/rating.model';

@Component({
    selector: 'app-show-details',
    templateUrl: './show-details.page.html',
    styleUrls: ['./show-details.page.scss'],
})
export class ShowDetailsPage implements OnInit {
    show: Series;
    isLoading = false;
    average: number;
    rate: number;
    submitted = false;
    ratings: Rating[] = [];
    private ratingsSub: Subscription;

    constructor(private route: ActivatedRoute,
        private navCtrl: NavController,
        private showService: SeriesService,
        private loadingCtrl: LoadingController,
        private modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.route.paramMap.subscribe((paramMap) => {
            if (!paramMap.has('showId')) {
                this.navCtrl.navigateBack('/series');
                return;
            }


            this.showService
                .getShow(paramMap.get('showId'))
                .subscribe((show) => {
                    this.show = show;
                    this.calculate();
                    this.ratingsSub = this.showService.ratings.subscribe((ratings) => {
                        this.ratings = ratings;
                        this.submitted = this.checkRating();

                    });
                    this.isLoading = false;
                });
        });
    }

    ionViewWillEnter() {
        this.showService.getRatings().subscribe((ratings) => {
        });
    }
    checkRating() {

        for (const r of this.ratings) {
            if (r.movieID === this.show.id && r.user === JSON.parse(localStorage.getItem('currentUser')).email) {
                this.rate = r.rate;
                return true;
            }


        }
        return false;
    }

    onDeleteShow() {
        this.loadingCtrl.create({ message: 'Deleting...' }).then(loadingEl => {
            loadingEl.present();
            this.showService.deleteShow(this.show.id).subscribe(() => {
                loadingEl.dismiss();
                this.navCtrl.navigateBack('/series');
            });
        });
    }

    onEditShow() {
        this.modalCtrl.create({
            component: ShowModalComponent,
            componentProps: { show: this.show }
        }).then((modal) => {
            modal.present();
            return modal.onDidDismiss();
        }).then((resultData) => {
            if (resultData.role === 'confirm') {
                console.log(resultData);

                const show = new Series(
                    this.show.id,
                    resultData.data.showData.name,
                    resultData.data.showData.producer,
                    resultData.data.showData.image,
                    resultData.data.showData.description,
                    resultData.data.showData.year,
                    resultData.data.showData.country,
                    resultData.data.showData.genre,
                    resultData.data.showData.numberOfSeasons,
                    resultData.data.showData.averageDuration,
                    null,
                    this.show.grade,
                    this.show.peopleRated);

                this.showService
                    .editShow(
                        show)
                    .subscribe((res) => {
                        this.show = show;
                    });
            }
        });
    }
    calculate() {
        if (this.show.peopleRated == 0) {
            this.average = 0;
        }
        else {
            this.average = Math.round((this.show.grade / this.show.peopleRated) * 10) / 10;
        }
    }
    onRateSubmit() {
        this.submitted = true;
        this.show.grade += this.rate;
        this.show.peopleRated++;
        this.calculate();
        this.showService
            .editShow(
                this.show)
            .subscribe((res) => {
                this.show = this.show;
            });
        let ratingToAdd = new Rating(null, JSON.parse(localStorage.getItem('currentUser')).email, this.show.id, this.rate);
        this.showService.addRating(ratingToAdd).subscribe((res) => {
            console.log(res);
        });
        this.calculate();
    }
    onRateRemove() {
        this.submitted = false;
        this.show.grade -= this.rate;
        this.show.peopleRated--;
        this.calculate();
        this.showService.editShow(this.show);
        this.calculate();
        let rID;
        for(let r of this.ratings){
            if(r.movieID === this.show.id && r.user === JSON.parse(localStorage.getItem('currentUser')).email){
                rID = r.id;
            }
        }
        this.showService.deleteRating(rID);
        this.calculate();
    }
}
