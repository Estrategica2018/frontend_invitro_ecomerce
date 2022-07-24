import { Component } from '@angular/core';
import { MenuController, Platform, ToastController, ModalController } from '@ionic/angular';
import { LoginComponent } from './components/login/login.component';

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

  constructor(
    private modalCtrl: ModalController
  ) {

    this.listenForLoginEvents();
  }

  listenForLoginEvents() {

    window.addEventListener('user:login', (user) => {
      window.location.reload();
    });

    window.addEventListener('show:login-modal', () => {
      this.presenterLoginModal('login', null, null);
    });

    window.addEventListener('show:recovery-modal', (data: any) => {
      if (data.detail.token) {
        this.presenterLoginModal('recovery-token', data.detail.errors, data.detail);
      } else {
        this.presenterLoginModal('recovery', data.detail.errors, null);
      }
    });
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

}
