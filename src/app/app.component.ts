import { Component } from '@angular/core';
import { MenuController, Platform, ToastController, ModalController } from '@ionic/angular';
import { LoginComponent } from './components/login/login.component';
import { UsersService } from './api/users.service';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart-component';
import { ShoppingCartsService } from './api/shopping-carts.service';
import { AccountComponent } from './components/account/account.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  appPages = [
    { title: 'Inicio', url: '/Inicio', icon: 'mail' },
    { title: 'Acerca de', url: '/Acerca_de', icon: 'paper-plane' },
    { title: 'Servicios', url: '/Servicios', icon: 'heart' },
    { title: 'Productos', url: '/Productos', icon: 'archive' },
    { title: 'Contacto', url: '/Contacto', icon: 'trash' }
  ];

  modal = null;
  shoppingCartCount: 0;
  errors = null;
  loggedIn = false;

  constructor(
    private modalCtrl: ModalController,
    private usersService: UsersService,
    private shoppingCartsService: ShoppingCartsService,

  ) {

    this.listenForLoginEvents();
    this.getShoppingCart();
    this.checkLoginStatus();
  }

  listenForLoginEvents() {

    window.addEventListener('user:login', (user) => {
      window.location.reload();
    });

    window.addEventListener('show:login-modal', () => {
      this.presenterLoginModal('login', null, null);
    });
    
    window.addEventListener('show:account', () => {
      this.presentAccount();
    });

    window.addEventListener('show:recovery-modal', (data: any) => {
      if (data.detail.token) {
        this.presenterLoginModal('recovery-token', data.detail.errors, data.detail);
      } else {
        this.presenterLoginModal('recovery', data.detail.errors, null);
      }
    });
  }

  async presentAccount() {
    
    this.modal = await this.modalCtrl.create({
      component: AccountComponent,
      cssClass: 'boder-radius-modal',
      componentProps: {
        '_patern': this
      }
    });
    await this.modal.present();
    const { data } = await this.modal.onWillDismiss();

    if(data) {
    }
  }   


  async presenterLoginModal(showMenu, errors, recoveryData) {

    if (this.modal) { this.modal.dismiss(); }

    this.modal = await this.modalCtrl.create({
      component: LoginComponent,
      cssClass: 'boder-radius-modal',
      componentProps: {
        '_parent': this,
        'showMenu': showMenu,
        'errors': errors,
        'recoveryData': recoveryData
      }
    });

    this.modal.canDismiss = false;

    await this.modal.present();
    const { data } = await this.modal.onWillDismiss();

    if (data) {
    }
  }

  closePresenterModal() {
    if (this.modal) {
      this.modal.canDismiss = true;
    }
  }

  getShoppingCart() {
    //this.loading.present({message:'Cargando...'});
    this.usersService.getUser().then((userDataSession) => {
      this.shoppingCartsService.list(userDataSession)
        .then(response => {
          this.shoppingCartCount = response.length;
          //this.loading.dismiss();
        }, errors => {
          this.errors = errors;
          //this.loading.dismiss();
        })
        .catch(error => {
          this.errors = error;
          console.log(error);
          //this.loading.dismiss();
        });
    });
  }


  checkLoginStatus() {
    return this.usersService.isLoggedIn().then(user => {
      return this.updateLoggedInStatus(user);
    });
  }

  updateLoggedInStatus(user: any) {
    this.loggedIn = (user !== null);
  }


}
