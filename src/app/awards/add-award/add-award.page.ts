import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieService } from '../../services/movies/movie.service';
import { Genre } from 'src/app/model/genre.model';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Award } from 'src/app/model/award.model';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { Category } from 'src/app/model/category.model';
import { Actor } from 'src/app/model/actor.model';
import { SeriesService } from 'src/app/services/series/series.service';
import { Series } from 'src/app/model/series.model';
import { Content } from 'src/app/model/content.model';
import { CelebService } from 'src/app/services/celebs/celebs.service';
import { AwardService } from 'src/app/services/awards/awards.service';

@Component({
  selector: 'app-add-award',
  templateUrl: './add-award.page.html',
  styleUrls: ['./add-award.page.scss'],
})
export class AddAwardPage implements OnInit {
  @ViewChild('addForm', { static: true }) form: NgForm;

  categories: Category[] = [];
  actors: Actor[] = [];
  movies: Movie[] = [];
  series: Series[] = [];
  contents: Content[] = [];
  private moviesSub: Subscription;
  private seriesSub: Subscription;
  private celebSub: Subscription;
  private categorySub: Subscription;
  private awardToAdd: Award;



  constructor(private movieService: MovieService, private alertCtrl: AlertController,
              private router: Router, private celebService: CelebService, private seriesService: SeriesService,
              private awardService: AwardService) { }

  ngOnInit() {
    this.fillCategories();
    this.fillCelebs();
    this.fillMovies();
    this.fillSeries();
  }

  ionViewWillEnter() {
    this.movieService.getCategories().subscribe((categories) => {
    });
    this.movieService.getMovies().subscribe((movies) => {
    });
    this.celebService.getActors().subscribe((movies) => {
    });
    this.seriesService.getSeries().subscribe((movies) => {
    });


  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    if (this.moviesSub) {
      this.moviesSub.unsubscribe();
    }
    if (this.seriesSub) {
      this.seriesSub.unsubscribe();
    }
    if (this.celebSub) {
      this.celebSub.unsubscribe();
    }
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
  }


  fillCategories() {
    this.categorySub = this.movieService.categories.subscribe((categories) => {
      this.categories = categories;
      this.categories.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  fillMovies() {
    this.moviesSub = this.movieService.movies.subscribe((movies) => {
      this.movies = movies;
      this.movies.sort((a, b) => a.name.localeCompare(b.name));
      for (const m of this.movies){
        this.contents.push(m);
      }
      
    });
  }

  fillSeries() {
    this.seriesSub = this.seriesService.series.subscribe((series) => {
      this.series = series;
      this.series.sort((a, b) => a.name.localeCompare(b.name));
      for (const s of this.series){
        this.contents.push(s);
      }
    });
  }

  fillCelebs() {
    this.celebSub = this.celebService.actors.subscribe((celebs) => {
      this.actors = celebs;
      this.actors.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  onAddAward(form: NgForm) {
    if (form.valid) {
      this.awardToAdd = new Award(null, form.value.name, form.value.director, form.value.date, form.value.country, form.value.description,
        form.value.image, form.value.category, form.value.actor, form.value.content, null);


      this.awardService
        .addAward(this.awardToAdd)
        .subscribe(awards => {
          awards.map((award) => {
            if (award.name === form.name) {
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
      header: 'Saving award',
      message: 'Are you sure you want to save this award?',
      buttons: [
        {
          text: 'Save',
          handler: () => {
            this.onAddAward(form);
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
      message: 'Your award was successfully saved!',
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

