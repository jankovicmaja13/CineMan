import { Component, OnInit } from '@angular/core';
import { PopularSeriesPage } from './popular-series/popular-series.page';
import { SearchSeriesPage } from './search-series/search-series.page';
import { AddSeriesPage } from './add-series/add-series.page';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit {
  popular = PopularSeriesPage;
  search = SearchSeriesPage;
  add = AddSeriesPage;

  constructor() { }

  ngOnInit() {
  }

}
