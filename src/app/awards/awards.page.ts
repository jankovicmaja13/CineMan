import { Component, OnInit } from '@angular/core';
import { NewsPage } from './news/news.page';
import { AddAwardPage } from './add-award/add-award.page';

@Component({
  selector: 'app-movies',
  templateUrl: './awards.page.html',
  styleUrls: ['./awards.page.scss'],
})
export class AwardsPage implements OnInit {
  news = NewsPage;
  add = AddAwardPage;

  constructor() { }

  ngOnInit() {
  }

}
