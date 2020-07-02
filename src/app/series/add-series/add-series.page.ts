import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeriesService } from '../../services/series/series.service';
import { Genre } from 'src/app/model/genre.model';
import { Subscription } from 'rxjs';
import {AlertController} from '@ionic/angular';
import { Series } from 'src/app/model/series.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-series',
  templateUrl: './add-series.page.html',
  styleUrls: ['./add-series.page.scss'],
})
export class AddSeriesPage implements OnInit {
  @ViewChild('addForm', { static: true }) form: NgForm;
 
  years = [];
  genres: Genre[] = [];
  private genresSub: Subscription;
  series: Series[] = [];
  private seriesSub: Subscription;
  private seriesToAdd: Series;


  constructor(private seriesService: SeriesService, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
    this.fillYears();
    this.fillGenres();
  }

  ionViewWillEnter() {
    this.seriesService.getGenres().subscribe((genres) => {
      // this.genres = genres;
    });
    this.seriesService.getSeries().subscribe((series) => {
      // this.movies = movies;
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    if (this.seriesSub) {
        this.seriesSub.unsubscribe();
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
    this.genresSub = this.seriesService.genres.subscribe((genres) => {
      this.genres = genres;
      this.genres.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  onAddShow(form: NgForm) {
    if (form.valid) {
      this.seriesToAdd = new Series(null, form.value.name, form.value.producer, form.value.image, form.value.description, form.value.year,
        form.value.country, form.value.genre, form.value.numberOfSeasons, form.value.averageDuration, null, 0,0);

      console.log(this.seriesToAdd.genre.name);
      this.seriesService
        .addShow(this.seriesToAdd)
        .subscribe(series => {
          series.map((show) => {
            if (show.name === form.name){
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
        header: 'Saving series',
        message: 'Are you sure you want to save this show?',
        buttons: [
            {
                text: 'Save',
                handler: () => {
                    this.onAddShow(form);
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
      message: 'Your show was successfully saved!',
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

