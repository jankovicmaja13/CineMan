import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AwardsPage } from './awards.page';

describe('AwardsPage', () => {
  let component: AwardsPage;
  let fixture: ComponentFixture<AwardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AwardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
