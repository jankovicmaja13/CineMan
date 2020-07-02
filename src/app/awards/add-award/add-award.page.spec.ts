import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAwardPage } from './add-award.page';

describe('AddAwardPage', () => {
  let component: AddAwardPage;
  let fixture: ComponentFixture<AddAwardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAwardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAwardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
