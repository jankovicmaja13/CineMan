import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie.model';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Award } from 'src/app/model/award.model';
import { AwardService } from 'src/app/services/awards/awards.service';
import { AwardModalComponent } from '../award-modal/award-modal.component';

@Component({
    selector: 'app-award-details',
    templateUrl: './award-details.page.html',
    styleUrls: ['./award-details.page.scss'],
})
export class AwardDetailsPage implements OnInit {
    award: Award;
    isLoading = false;
    submitted = false;

    constructor(private route: ActivatedRoute,
                private navCtrl: NavController,
                private awardsService: AwardService,
                private loadingCtrl: LoadingController,
                private modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.route.paramMap.subscribe((paramMap) => {
            if (!paramMap.has('movieId')) {
                this.navCtrl.navigateBack('/movies');
                return;
            }

        });
        

    }
    onDeleteAward() {
        this.loadingCtrl.create({ message: 'Deleting...' }).then(loadingEl => {
            loadingEl.present();
            this.awardsService.deleteAward(this.award.id).subscribe(() => {
                loadingEl.dismiss();
                this.navCtrl.navigateBack('/awards');
            });
        });
    }

    onEditAward() {
        this.modalCtrl.create({
            component: AwardModalComponent,
            componentProps: { award: this.award }
        }).then((modal) => {
            modal.present();
            return modal.onDidDismiss();
        }).then((resultData) => {
            if (resultData.role === 'confirm') {
                console.log(resultData);

                const award = new Award(
                    this.award.id,
                    resultData.data.movieData.name,
                    resultData.data.movieData.director,
                    resultData.data.movieData.date,
                    resultData.data.movieData.country,
                    resultData.data.movieData.description,
                    resultData.data.movieData.image,
                    resultData.data.movieData.category,
                    resultData.data.movieData.actor,
                    resultData.data.movieData.movie,
                    null);

                this.awardsService
                    .editAward(
                        award)
                    .subscribe((res) => {
                        this.award = award;
                    });
            }
        });
    }
}
