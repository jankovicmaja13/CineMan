import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchSeriesPage } from './search-series.page';

describe('SearchSeriesPage', () => {
  let component: SearchSeriesPage;
  let fixture: ComponentFixture<SearchSeriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSeriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchSeriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
