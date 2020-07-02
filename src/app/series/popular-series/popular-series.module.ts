import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopularSeriesPage } from './popular-series.page';
import { MbscModule } from '@mobiscroll/angular';
import { GenrePipePipe } from '../genre-pipe.pipe';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MbscModule,
    RouterModule
  ],
  declarations: [PopularSeriesPage, GenrePipePipe],
  entryComponents: [PopularSeriesPage],
  bootstrap: [PopularSeriesPage]
})
export class PopularSeriesPageModule {}
