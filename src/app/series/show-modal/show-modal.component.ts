import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Series } from 'src/app/model/series.model';
import { ModalController } from '@ionic/angular';
import { Genre } from 'src/app/model/genre.model';
import { Subscription } from 'rxjs';
import { SeriesService } from 'src/app/services/series/series.service';

@Component({
  selector: 'app-show-modal',
  templateUrl: './show-modal.component.html',
  styleUrls: ['./show-modal.component.scss'],
})
export class ShowModalComponent implements OnInit {
  @ViewChild('f', { static: true }) form: NgForm;
  @Input() show: Series;

  years = [];
  genre: Genre;
  genres: Genre[] = [];
  private genresSub: Subscription;

  constructor(private modalCtrl: ModalController, private seriesService: SeriesService) { }

  ngOnInit() {
    this.genre = this.show.genre;
    console.log(this.genre.name);
    this.fillYears();
    this.fillGenres();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    if (this.genresSub) {
        this.genresSub.unsubscribe();
    }
}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  fillYears() {
    for (let i = 2020; i >= 1920; i--) {
      this.years.push(i);
    }
  }

  fillGenres() {
    this.genresSub = this.seriesService.genres.subscribe((newGenres) => {
      this.genres = newGenres;
      this.genres.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
  onEditShow() {
    if (!this.form.valid) {
      return;
    }

    this.modalCtrl.dismiss({
      showData:
      {
        name: this.form.value.name,
        producer: this.form.value.producer,
        image: this.form.value.image,
        description: this.form.value.description,
        year: this.form.value.year,
        country: this.form.value.country,
        genre: this.form.value.genre,
        numberOfSeasons: this.form.value.numberOfSeasons,
        averageDuration: this.form.value.averageDuration
      }
    }, 'confirm');

  }

}
