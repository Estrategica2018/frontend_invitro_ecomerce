import { Component, HostListener, OnInit } from '@angular/core';
import { ProductsService } from '../../api/products.service';
import { Animation, AnimationController } from '@ionic/angular';
import { faTruckRampBox } from '@fortawesome/free-solid-svg-icons';
import { LoadingService } from './../../providers/loading.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
})
export class ProductsListPage implements OnInit {

  largeScreen = window.innerWidth >= 768;
  animation: Animation;

  banner = {
    "url": "https://invitrocolombia.com.co/wp-content/uploads/2021/03/DSC_0045-1-1024x683.jpg",
    "description": "Duis mollis, est non commodo luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus",
    "title": "Nuestros productos",
    "footer": "Duis molestie"
  };

  categorySales = [];
  categorySaleSelected = null;
  productList = [];
  productListFiltered = [];
  categorySelected: any;
  attributeSelected: string;
  categoryAttributesSales = [];
  errors: string;

  constructor(
    private animationCtrl: AnimationController,
    private productsService: ProductsService,
    private loading: LoadingService,
    private router: Router,) { }


  ionViewWillEnter() {
    window.dispatchEvent(new CustomEvent("onChange:menuSide", { "detail": { "segmentInit": 3 } }));
  }

  ngOnInit() {
    this.productListInitialize();
  }

  productListInitialize() {

    this.loading.present({ message: 'Cargando...' });
    let category: any;

    this.productsService.getProducts()
      .then((productDetail: any) => {

        this.loading.dismiss();
        this.productList = productDetail;
        let mbControl = false;
        this.categorySales = [];
        let mbcontrol: boolean;
        this.categoryAttributesSales = [];

        for (let product of this.productList) {
          mbControl = false;
          for (let category of this.categorySales) {
            if (category.id == product.category.id) {
              mbControl = true;
              category = category;
              break;
            }
          }
          if (!mbControl) {
            category = product.category;
            this.categorySales.push(category);
          }

          category.attributes = category.attributes || [];

          product.attributes = product.attributes || '';

          for (let attr of product.attributes.split('|')) {
            mbcontrol = false;
            for (let attrCategory of category.attributes) {
              if (attr == attrCategory) {
                mbcontrol = true;
              }
            }
            if (!mbcontrol) {
              category.attributes.push(attr);
            }
          }

        }

        if (this.categorySales.length > 0) {
          this.onChangeCategorySale(this.categorySales[0], null);
        }
        else {
          this.productListFiltered = [];
        }

      }, error => {
        this.loading.dismiss();
        this.errors = error;
      });
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


  goToUrl(url: string) {
    this.router.navigate([url]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.largeScreen = event.target.innerWidth >= 768;
  }

}
