import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AwardsPage } from './awards.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { AwardsPageRoutingModule } from './awards-routing.module';
import { NewsPageModule } from './news/news.module';
import { AddAwardPageModule } from './add-award/add-award.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AwardsPageRoutingModule,
    SuperTabsModule,
    NewsPageModule,
    AddAwardPageModule
  ],
  declarations: [AwardsPage]
})
export class AwardsPageModule {}
