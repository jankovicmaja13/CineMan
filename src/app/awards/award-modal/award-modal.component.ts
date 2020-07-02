import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Movie } from 'src/app/model/movie.model';
import { ModalController } from '@ionic/angular';
import { Genre } from 'src/app/model/genre.model';
import { Subscription } from 'rxjs';
import { AwardService } from 'src/app/services/awards/awards.service';
import { Award } from 'src/app/model/award.model';
import { Category } from 'src/app/model/category.model';
import { Actor } from 'src/app/model/actor.model';
import { Series } from 'src/app/model/series.model';
import { Content } from 'src/app/model/content.model';
import { MovieService } from 'src/app/services/movies/movie.service';
import { SeriesService } from 'src/app/services/series/series.service';
import { CelebService } from 'src/app/services/celebs/celebs.service';

@Component({
  selector: 'app-award-modal',
  templateUrl: './award-modal.component.html',
  styleUrls: ['./award-modal.component.scss'],
})
export class AwardModalComponent implements OnInit {
  @ViewChild('f', { static: true }) form: NgForm;
  @Input() award: Award;


  categories: Category[] = [];
  celebs: Actor[] = [];
  movies: Movie[] = [];
  series: Series[] = [];
  content: Content[] = [];
  private moviesSub: Subscription;
  private seriesSub: Subscription;
  private categorySub: Subscription;
  private celebSub: Subscription;

  constructor(private modalCtrl: ModalController, private awardService: AwardService, private movieService: MovieService,
    private seriesService: SeriesService, private celebService: CelebService) { }

  ngOnInit() {
    this.fillCategories();
    this.fillCelebs();
    this.fillMovies();
    this.fillSeries();
    for(let m of this.movies){
      this.content.push(m);
    }
    for(let s of this.series){
      this.content.push(s);
    }
    this.content.sort((a, b) => a.name.localeCompare(b.name));
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

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
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
    });
  }

  fillSeries() {
    this.seriesSub = this.seriesService.series.subscribe((series) => {
      this.series = series;
      this.series.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  fillCelebs() {
    this.celebSub = this.celebService.actors.subscribe((celebs) => {
      this.celebs = celebs;
      this.celebs.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
  onEditAward() {
    if (!this.form.valid) {
      return;
    }

    this.modalCtrl.dismiss({
      awardData:
      {
        name: this.form.value.name,
        director: this.form.value.director,
        image: this.form.value.image,
        description: this.form.value.description,
        date: this.form.value.date,
        country: this.form.value.country,
        category: this.form.value.category,
        actor: this.form.value.actor,
        movie: this.form.value.movie
      }
    }, 'confirm');

  }

 

}
