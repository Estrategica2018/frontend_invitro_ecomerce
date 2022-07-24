import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesListPageRoutingModule } from './services-list-routing.module';

import { ServicesListPage } from './services-list.page';
import { ComponentsModule } from 'src/app/app-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ServicesListPage]
})
export class ServicesListPageModule {}
