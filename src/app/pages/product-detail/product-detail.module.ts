import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ProductDetailPageRoutingModule } from './product-detail-routing.module';
import { ProductDetailPage } from './product-detail.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgxImageZoomModule } from 'ngx-image-zoom';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailPageRoutingModule,
    FontAwesomeModule,
    NgxImageZoomModule
  ],
  declarations: [ProductDetailPage]
})
export class ProductDetailPageModule {}
