import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule, Title } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe,CurrencyPipe } from '@angular/common';

import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localeEs, "es");

import { RouteReuseStrategy } from '@angular/router';
import * as Cloudinary from "cloudinary-core";
import {
  CloudinaryModule,
  CloudinaryConfiguration
} from "@cloudinary/angular-5.x";


import { ComponentsModule } from './app-components.module';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    FontAwesomeModule,
    CloudinaryModule.forRoot(Cloudinary, {
      cloud_name: "demo" //specify cloud_name
    } as CloudinaryConfiguration)
  ],
  declarations: [AppComponent],
  providers: [
    DatePipe,
    CurrencyPipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: "es" },
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary) { 
		library.addIconPacks(fas, fab, far);
	}
 }
