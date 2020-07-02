import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSeriesPage } from './add-series.page';

describe('AddMoviePage', () => {
  let component: AddSeriesPage;
  let fixture: ComponentFixture<AddSeriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSeriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSeriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
