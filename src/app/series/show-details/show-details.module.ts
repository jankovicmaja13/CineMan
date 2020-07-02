import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowDetailsPageRoutingModule} from './show-details-routing.module';
import { ShowDetailsPage } from './show-details.page';
import { ShowModalComponent } from '../show-modal/show-modal.component';
import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowDetailsPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [ShowDetailsPage, ShowModalComponent],
  entryComponents: [ShowModalComponent]
})
export class ShowDetailsPageModule {}
