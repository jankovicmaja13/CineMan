import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeriesPageRoutingModule } from './series-routing.module';

import { SeriesPage } from './series.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { PopularSeriesPageModule } from './popular-series/popular-series.module';
import { SearchSeriesPageModule } from './search-series/search-series.module';
import { AddSeriesPageModule } from './add-series/add-series.module';

@NgModule({
  imports: [ 
    MbscModule, 
    CommonModule,
    FormsModule,
    IonicModule,
    SeriesPageRoutingModule,
    SuperTabsModule,
    PopularSeriesPageModule,
    SearchSeriesPageModule,
    AddSeriesPageModule
  ],
  declarations: [SeriesPage]
})
export class SeriesPageModule {}
