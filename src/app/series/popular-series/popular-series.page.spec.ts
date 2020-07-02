import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopularSeriesPage } from './popular-series.page';

describe('PopularSeriesPage', () => {
  let component: PopularSeriesPage;
  let fixture: ComponentFixture<PopularSeriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularSeriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopularSeriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
