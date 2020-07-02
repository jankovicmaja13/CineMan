import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AwardElementComponent } from './award-element.component';

describe('AwardElementComponent', () => {
  let component: AwardElementComponent;
  let fixture: ComponentFixture<AwardElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardElementComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AwardElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
