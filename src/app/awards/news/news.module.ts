import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPage } from './news.page';
import { MbscModule } from '@mobiscroll/angular';
import { CategoryPipePipe } from '../category-pipe.pipe';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  declarations: [NewsPage, CategoryPipePipe],
  entryComponents: [NewsPage],
  bootstrap: [NewsPage]
})
export class NewsPageModule {}
