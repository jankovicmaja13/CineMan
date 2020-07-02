import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie.model';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movies/movie.service';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';
import { Subscription } from 'rxjs';
import { Rating } from 'src/app/model/rating.model';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.page.html',
    styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
    movie: Movie;
    isLoading = false;
    average: number;
    rate: number;
    submitted = false;
    ratings: Rating[] = [];
    private ratingsSub: Subscription;

    constructor(private route: ActivatedRoute,
                private navCtrl: NavController,
                private moviesService: MovieService,
                private loadingCtrl: LoadingController,
                private modalCtrl: ModalController,
                private movieService: MovieService) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.route.paramMap.subscribe((paramMap) => {
            if (!paramMap.has('movieId')) {
                this.navCtrl.navigateBack('/movies');
                return;
            }


            this.moviesService
                .getMovie(paramMap.get('movieId'))
                .subscribe((movie) => {
                    this.movie = movie;
                    this.calculate();
                    this.ratingsSub = this.movieService.ratings.subscribe((ratings) => {
                        this.ratings = ratings;
                        this.submitted = this.checkRating();
                        
                      });
                    this.isLoading = false;
                });

        });
        

    }
    ionViewWillEnter() {
        this.movieService.getRatings().subscribe((ratings) => {
        });
      }
    checkRating(){
        
        for (const r of this.ratings) {
            if (r.movieID === this.movie.id && r.user === JSON.parse(localStorage.getItem('currentUser')).email){
                this.rate = r.rate;   
                return true;
            }


        }     
        return false;
    }

    onDeleteMovie() {
        this.loadingCtrl.create({ message: 'Deleting...' }).then(loadingEl => {
            loadingEl.present();
            this.moviesService.deleteMovie(this.movie.id).subscribe(() => {
                loadingEl.dismiss();
                this.navCtrl.navigateBack('/movies');
            });
        });
    }

    calculate(){
        if (this.movie.peopleRated == 0) {
            this.average = 0;
        }
        else{
        this.average = Math.round((this.movie.grade / this.movie.peopleRated)*10)/10;
        }
    }

    onEditMovie() {
        this.modalCtrl.create({
            component: MovieModalComponent,
            componentProps: { movie: this.movie }
        }).then((modal) => {
            modal.present();
            return modal.onDidDismiss();
        }).then((resultData) => {
            if (resultData.role === 'confirm') {
                console.log(resultData);

                const movie = new Movie(
                    this.movie.id,
                    resultData.data.movieData.name,
                    resultData.data.movieData.producer,
                    resultData.data.movieData.image,
                    resultData.data.movieData.description,
                    resultData.data.movieData.year,
                    resultData.data.movieData.country,
                    resultData.data.movieData.genre,
                    resultData.data.movieData.budget,
                    resultData.data.movieData.duration,
                    null,
                   this.movie.grade,
                   this.movie.peopleRated);

                this.moviesService
                    .editMovie(
                        movie)
                    .subscribe((res) => {
                        this.movie = movie;
                    });
            }
        });
    }
    onRateSubmit(){
        this.submitted = true;
        this.movie.grade += this.rate;
        this.movie.peopleRated++;
        this.calculate();
        this.moviesService
                    .editMovie(
                        this.movie)
                    .subscribe((res) => {
                        this.movie = this.movie;
                    });
        let ratingToAdd = new Rating(null,JSON.parse(localStorage.getItem('currentUser')).email, this.movie.id, this.rate);
        this.movieService.addRating( ratingToAdd ).subscribe((res)=>{
                                                    console.log(res);
        });

        this.calculate();
    }
    onRateRemove(){
        this.submitted = false;
        console.log(this.rate);
        this.movie.grade -= this.rate;
        this.movie.peopleRated--;
        this.calculate();
        this.moviesService.editMovie(this.movie);
        this.calculate();
        let rID;
        for(let r of this.ratings){
            if(r.movieID === this.movie.id && r.user === JSON.parse(localStorage.getItem('currentUser')).email){
                rID = r.id;
            }
        }
        this.movieService.deleteRating(rID);
        this.calculate();
    }
}
