import { Component, OnInit, Input } from '@angular/core';
import { Award } from 'src/app/model/award.model';

@Component({
  selector: 'app-award-element',
  templateUrl: './award-element.component.html',
  styleUrls: ['./award-element.component.scss'],
})
export class AwardElementComponent implements OnInit {
  @Input() award: Award;
  constructor() { }

  ngOnInit() {}

}
