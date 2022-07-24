import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ComponentsModule } from 'src/app/app-components.module';
import { SwiperModule } from 'swiper/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule,
    SwiperModule,
    FontAwesomeModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
