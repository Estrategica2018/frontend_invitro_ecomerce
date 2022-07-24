import { Component, HostListener, OnInit } from '@angular/core';
import {  ServicesService } from '../../api/services.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.page.html',
  styleUrls: ['./services-list.page.scss'],
})
export class ServicesListPage implements OnInit {

  largeScreen: boolean = window.innerWidth >= 800;
  services : any;

  banner = {
    "url": "https://invitrocolombia.com.co/wp-content/uploads/2021/03/DSC_0045-1-1024x683.jpg",
    "description": "Duis mollis, est non commodo luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus",
    "title": "Nuestros servicios",
    "footer": "Duis molestie"
  };

  

  constructor(private servicesApi: ServicesService) { }

  ngOnInit() {
    this.services = this.servicesApi.mockServices();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.largeScreen = event.target.innerWidth >= 800;
  }

}
