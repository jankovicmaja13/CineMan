import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailsPageRoutingModule } from './movie-details-routing.module';

import { MovieDetailsPage } from './movie-details.page';
import { MovieModalComponent} from '../movie-modal/movie-modal.component';
import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDetailsPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [MovieDetailsPage, MovieModalComponent],
  entryComponents: [MovieModalComponent]
})
export class MovieDetailsPageModule {}
