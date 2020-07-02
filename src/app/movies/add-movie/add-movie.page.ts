import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieService } from '../../services/movies/movie.service';
import { Genre } from 'src/app/model/genre.model';
import { Subscription } from 'rxjs';
import {AlertController} from '@ionic/angular';
import { Movie } from 'src/app/model/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage implements OnInit {
  @ViewChild('addForm', { static: true }) form: NgForm;
 
  years = [];
  genres: Genre[] = [];
  private genresSub: Subscription;
  movies: Movie[] = [];
  private moviesSub: Subscription;
  private movieToAdd: Movie;


  constructor(private movieService: MovieService, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
    this.fillYears();
    this.fillGenres();
  }

  ionViewWillEnter() {
    this.movieService.getGenres().subscribe((genres) => {
      // this.genres = genres;
    });
    this.movieService.getMovies().subscribe((movies) => {
      // this.movies = movies;
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    if (this.moviesSub) {
        this.moviesSub.unsubscribe();
    }
    if (this.genresSub) {
      this.genresSub.unsubscribe();
  }
}


  fillYears() {
    for (let i = 2020; i >= 1920; i--) {
      this.years.push(i);
    }
  }

  fillGenres() {
    this.genresSub = this.movieService.genres.subscribe((genres) => {
      this.genres = genres;
      this.genres.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  onAddMovie(form: NgForm) {
    if (form.valid) {
      this.movieToAdd = new Movie(null, form.value.name, form.value.producer, form.value.image, form.value.description, form.value.year,
        form.value.country, form.value.genre, form.value.budget, form.value.duration, null, 0,0);

      console.log(this.movieToAdd.genre.name);
      this.movieService
        .addMovie(this.movieToAdd)
        .subscribe(movies => {
          movies.map((movie) => {
            if (movie.name === form.name){
              this.openSavedAlert('$event');
            }
          });
        });
    }
  }
  openAlert(form: NgForm, event) {

    event.stopPropagation();
    event.preventDefault();

    this.alertCtrl.create({
        header: 'Saving movie',
        message: 'Are you sure you want to save this movie?',
        buttons: [
            {
                text: 'Save',
                handler: () => {
                    this.onAddMovie(form);
                    this.openSavedAlert(event);
                    form.reset();
                }
            },
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log('Did not save it!');
                }
            }
        ]
    }).then((alert) => {
        alert.present();
    });
}
openSavedAlert(event) {

  event.stopPropagation();
  event.preventDefault();

  this.alertCtrl.create({
      header: 'Succesfully saved',
      message: 'Your movie was successfully saved!',
      buttons: [
          {
              text: 'OK',
              handler: () => {
              }
          }
      ]
  }).then((alert) => {
      alert.present();
  });
}
}

