import { Component, HostListener, OnInit } from '@angular/core';
import { ProductsService } from '../../api/products.service';
import { Animation, AnimationController } from '@ionic/angular';
import { faTruckRampBox } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
})
export class ProductsListPage implements OnInit {

  largeScreen = window.innerWidth >= 800;
  animation: Animation;

  banner = {
    "url": "https://invitrocolombia.com.co/wp-content/uploads/2021/03/DSC_0045-1-1024x683.jpg",
    "description": "Duis mollis, est non commodo luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus",
    "title": "Nuestros productos",
    "footer": "Duis molestie"
  };

  categorySales = [];
  categorySaleSelected = 1;
  productList = [];
  productListFiltered = [];
  categorySelected: any;
  attributeSelected: string;
  categoryAttributesSales = [];

  constructor(
    private animationCtrl: AnimationController,
    private productsApi: ProductsService) { }

  ngOnInit() {
    this.productListInitialize();
  }

  productListInitialize() {
    this.productList = this.productsApi.mockNewProducts();
    let mbControl = false;
    this.categorySales = [];
    let mbcontrol: boolean;
    this.categoryAttributesSales = [];

    for (let product of this.productList) {
      mbControl = false;
      for (let category of this.categorySales) {
        if (category.id == product.category.id) {
          mbControl = true;
        }
      }
      if (!mbControl) {
        this.categorySales.push(product.category);
      }

      product.category.attributes = product.category.attributes || [];

      product.attributes = product.attributes || '';

      for (let attr of product.attributes.split('|')) {
        mbcontrol = false;
        for (let attrCategory of product.category.attributes) {
          if (attr == attrCategory) {
            mbcontrol = true;
          }
        }
        if (!mbcontrol) {
          product.category.attributes.push(attr);
        }
      }

    }

    if(this.categorySales.length > 0 ) {
       this.onChangeCategorySale(this.categorySales[0], null);
    }
    else {
      this.productListFiltered = [];
    }
  }

  onChangeCategorySale(category: any, attribute: string) {

    this.categorySelected = category;
    this.attributeSelected = attribute;

    this.animation = this.animationCtrl.create()
      .addElement(document.querySelector('.products-section'))
      .duration(1000)
      .fromTo('opacity', '0.3', '1');


    this.categorySales.forEach((category: any) => {
      category.active = category.id == this.categorySelected.id;
    });

    this.productListFiltered = this.productList.filter((product) => {
      if (product.category && product.category.id == this.categorySelected.id) {
        if (attribute) {
          for (let attr of product.attributes.split('|')) {
            if (attr == attribute) {
              return true;
            }
          }
          return false;
        }
        else return true;
      }
      return false;
    });

    this.animation.play();

  }

  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.largeScreen = event.target.innerWidth >= 800;
  }

}
