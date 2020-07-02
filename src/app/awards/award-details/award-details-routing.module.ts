import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AwardDetailsPage } from './award-details.page';

const routes: Routes = [
  {
    path: '',
    component: AwardDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AwardDetailsPageRoutingModule {}
