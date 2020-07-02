import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Filter } from '../filter.pipe';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SearchSeriesPage } from './search-series.page';
import { ShowElementComponent } from '../show-element/show-element.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  declarations: [SearchSeriesPage, Filter, ShowElementComponent],
  entryComponents: [SearchSeriesPage]
})
export class SearchSeriesPageModule {}
