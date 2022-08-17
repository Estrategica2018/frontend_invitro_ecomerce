import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesDetailPage } from './services-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesDetailPageRoutingModule {}
