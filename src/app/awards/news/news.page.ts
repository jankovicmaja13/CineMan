import { Component, OnInit } from '@angular/core';
import { mobiscroll, MbscListviewOptions } from '@mobiscroll/angular';
import { Movie } from 'src/app/model/movie.model';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movies/movie.service';
import { Genre } from 'src/app/model/genre.model';
import { LoadingController } from '@ionic/angular';
import { Award } from 'src/app/model/award.model';
import { AwardService } from 'src/app/services/awards/awards.service';
import { Category } from 'src/app/model/category.model';
import { Series } from 'src/app/model/series.model';
import { SeriesService } from 'src/app/services/series/series.service';

mobiscroll.settings = {
  theme: 'ios',
  themeVariant: 'light'
};


@Component({
  selector: 'app-news-movies',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  isLoading = false;
  categories: Category[] = [];
  awards: Award[] = [];
  movies: Movie[] = [];
  series: Series[] = [];
  private awardsSub: Subscription;
  private categorySub: Subscription;
  private movieSub: Subscription;
  private showSub: Subscription;


  constructor(private awardsService: AwardService,
    private moviesService: MovieService,
    private seriesService: SeriesService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.isLoading=true;
    this.categorySub = this.moviesService.categories.subscribe((categories) => {
      
      this.categories = categories;
      
    });
    this.awardsSub = this.awardsService.awards.subscribe((awards) => {
      this.awards = awards;
    });
    this.showSub = this.seriesService.series.subscribe((series) => {
      this.series=series;
    });
    this.movieSub = this.moviesService.movies.subscribe((movies) => {
      this.movies=movies;
      this.isLoading=false;
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    if (this.awardsSub) {
      this.awardsSub.unsubscribe();
    }
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.awardsService.getAwards().subscribe((awards) => {
    });
    this.moviesService.getCategories().subscribe((categories) => {
    });
    this.moviesService.getMovies().subscribe((movies) => {
    });
    this.seriesService.getSeries().subscribe((series) => {
    });
  }

  includes(name: string){
    for(let m of this.movies){
        if(m.name===name){
          return true;
        }
    }
    return false;
  }

}
