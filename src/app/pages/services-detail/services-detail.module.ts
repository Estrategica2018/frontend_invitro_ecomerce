import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesDetailPageRoutingModule } from './services-detail-routing.module';

import { ServicesDetailPage } from './services-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesDetailPageRoutingModule
  ],
  declarations: [ServicesDetailPage]
})
export class ServicesDetailPageModule {}
