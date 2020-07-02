import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopularMoviesPage } from './popular-movies.page';
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
  declarations: [PopularMoviesPage, GenrePipePipe],
  entryComponents: [PopularMoviesPage],
  bootstrap: [PopularMoviesPage]
})
export class PopularMoviesPageModule {}
