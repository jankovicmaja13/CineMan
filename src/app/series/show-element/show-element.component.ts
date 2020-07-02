import { Component, OnInit, Input } from '@angular/core';
import { Series } from 'src/app/model/series.model';

@Component({
  selector: 'app-show-element',
  templateUrl: './show-element.component.html',
  styleUrls: ['./show-element.component.scss'],
})
export class ShowElementComponent implements OnInit {
  @Input() show: Series;
  constructor() { }

  ngOnInit() {}

}
