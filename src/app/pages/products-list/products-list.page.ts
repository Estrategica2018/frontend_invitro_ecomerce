import { Component, HostListener, OnInit } from '@angular/core';
import { ProductsService } from '../../api/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
})
export class ProductsListPage implements OnInit {

  largeScreen = window.innerWidth >= 800;

  banner = {
    "url": "https://invitrocolombia.com.co/wp-content/uploads/2021/03/DSC_0045-1-1024x683.jpg",
    "description": "Duis mollis, est non commodo luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus",
    "title": "Nuestros productos",
    "footer": "Duis molestie"
  };

  products = [];

  constructor(private productsApi: ProductsService) { }

  ngOnInit() {
    this.products = this.productsApi.mockProducts();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.largeScreen = event.target.innerWidth >= 800;
  }

}
