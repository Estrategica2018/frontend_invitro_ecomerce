import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuSideComponent } from './components/menu-side/menu-side.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart-component';
import { AccountComponent } from './components/account/account.component';
import { NetworkStatusComponent } from './components/network-status/network-status.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MenuSideComponent,
    CarouselComponent,
    FooterComponent,
    LoginComponent,
    NetworkStatusComponent,
    ShoppingCartComponent,
    AccountComponent
  ],
  exports: [
    MenuSideComponent,
    CarouselComponent,
    FooterComponent,
    LoginComponent,
    NetworkStatusComponent,
    ShoppingCartComponent,
    AccountComponent
  ]

})

export class ComponentsModule {
  constructor() {

  }
}