import { Component, HostListener, OnInit } from '@angular/core';
import { ServicesService } from '../../api/services.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.page.html',
  styleUrls: ['./services-list.page.scss'],
})
export class ServicesListPage implements OnInit {

  largeScreen: boolean = window.innerWidth >= 768;
  services: any;
  errors : any;

  banner = {
    "url": "https://invitrocolombia.com.co/wp-content/uploads/2021/03/DSC_0045-1-1024x683.jpg",
    "description": "Duis mollis, est non commodo luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus",
    "title": "Nuestros servicios",
    "footer": "Duis molestie"
  };

  constructor(
    private servicesApi: ServicesService,
    private router: Router,) { }

  ionViewWillEnter() {
    window.dispatchEvent(new CustomEvent("onChange:menuSide", { "detail": { "segmentInit": 2 } }));
  }

  ngOnInit() {
    this.servicesApi.getServices().then((services) => {
      this.services = services;
      this.services.push({
        "productList": 1,
        "name": "Venta de genética",
        "image_url": "https://invitrocolombia.com.co/wp-content/uploads/2021/03/congelacion-1024x683.jpg"
      });

    }, error => this.errors = error);
  }


  goToUrl(url: string) {
    this.router.navigate([url]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.largeScreen = event.target.innerWidth >= 768;
  }

}
