import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-menu-side',
  templateUrl: './menu-side.component.html',
  styleUrls: ['./menu-side.component.scss'],
})
export class MenuSideComponent implements OnInit {

  largeScreen = window.innerWidth >= 1012;
  userDataSession = false;
  shoppingCartCount = 0;
  loggedIn = false;
  segmentInit = 0; 2
  showBannerSideMenu = false;

  constructor(
    private router: Router,
    private modalCtrl: ModalController) { }

  appPages = [
    { title: 'Inicio', url: 'Inicio', icon: 'mail' },
    { title: 'Acerca de', url: 'Acerca_de', icon: 'paper-plane' },
    { title: 'Servicios', url: 'Servicios', icon: 'heart' },
    { title: 'Productos', url: 'Productos', icon: 'archive' },
    { title: 'Contacto', url: 'Contacto', icon: 'trash' }
  ];

  site = {
    'icon': 'https://res.cloudinary.com/deueufyac/image/upload/v1657912035/e-commerce/icon-invitro_xnxxjq.png',
    'name': 'Invitro Colombia'
  }

  modal = null;

  ngOnInit() {

    let pathname = window.location.pathname;
    this.appPages.forEach((page, indx) => {
      if (pathname.indexOf(page.url) >= 0) {
        this.segmentInit = indx;
      }
    });
  }


  openShoppingCart() { }

  /*presenterLogin() {
    alert('show');
    window.dispatchEvent(new CustomEvent('show:login-modal'));
  }*/

  presenterLogin() {
    window.dispatchEvent(new CustomEvent('show:login-modal'));
  }

  presentAccount() { }

  goToUrl(url: string) {
    this.router.navigate([url]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.largeScreen = event.target.innerWidth >= 1012;
  }
}
