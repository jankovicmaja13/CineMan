import { Component, OnInit } from '@angular/core';
import { mobiscroll, MbscListviewOptions } from '@mobiscroll/angular';
import { Series } from 'src/app/model/series.model';
import { Subscription } from 'rxjs';
import { Genre } from 'src/app/model/genre.model';
import { LoadingController } from '@ionic/angular';
import { SeriesService } from 'src/app/services/series/series.service';

mobiscroll.settings = {
  theme: 'ios',
  themeVariant: 'light'
};


@Component({
  selector: 'app-popular-series',
  templateUrl: './popular-series.page.html',
  styleUrls: ['./popular-series.page.scss'],
})
export class PopularSeriesPage implements OnInit {
  isLoading = false;
  series: Series[] = [];
  genres = ['Action', 'Thriller', 'Drama', 'Comedy', 'Mistery', 'Romantic', 'SciFi', 'Crime', 'Western', 'Documentary', 'Animated',
    'Adventure', 'Horror', 'Fantasy', 'Family', 'Biography', 'War', 'History', 'Musical', 'Sport'];
  first: string;
  second: string;
  third: string;
  private seriesSub: Subscription;

  listSettings: MbscListviewOptions = {
    stages: [{
      percent: -20,
      action: (event, inst) => {
        inst.remove(event.target);
        return false;
      }
    }, {
      percent: 20,
      action: (event, inst) => {
        inst.remove(event.target);
        return false;
      }
    }],
    actionable: false
  };

  cycleSettings: MbscListviewOptions = {
    stages: [{
      percent: -20,
      action: (event, inst) => {
        inst.move(event.target, 0);
        return false;
      }
    }, {
      percent: 20,
      action: (event, inst) => {
        inst.move(event.target, 0);
        return false;
      }
    }],
    actionable: false
  };

  constructor(private seriesService: SeriesService,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.seriesSub = this.seriesService.series.subscribe((series) => {
      this.series = series;

      this.isLoading = true;

      let f = 0;
      let s = 0;
      let t = 0;

      for (const g of this.genres) {
        let i = 0;
        // tslint:disable-next-line: no-shadowed-variable
        for (const s of this.series) {
          if (g === s.genre.name) {
            i++;
          }
        }
        if (i > f) {
          f = i;
          this.first = g;
        }
        else if (i > s) {
          s = i;
          this.second = g;
        }
        else if (i > t) {
          t = i;
          this.third = g;
        }

      }
      this.isLoading = false;
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    if (this.seriesSub) {
        this.seriesSub.unsubscribe();
    }
}

  ionViewWillEnter() {
    this.seriesService.getSeries().subscribe((series) => {
      // this.series = series;
    });
  }

}
