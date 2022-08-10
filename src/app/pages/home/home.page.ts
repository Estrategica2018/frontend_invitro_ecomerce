import { Component, createNgModuleRef, HostListener, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation, Swiper } from 'swiper';
import { Animation, AnimationController } from '@ionic/angular';
import { ProductsService } from '../../api/products.service';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation]);


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  swiperList = [];
  largeScreen = window.innerWidth >= 800;
  newProducts = [];
  animation: Animation;
  sectionColaboration = 1;
  colaborationList = [];
  colaborationFilterList = [];
  tabMenuSelected: number = 1;
  categorySales = [];
  categorySaleSelected = 1;
  productList = [];
  productListFiltered = [];

  constructor(private animationCtrl: AnimationController,
    private productsApi: ProductsService) {

  }

  ngOnInit() {
    
    this.productListInitialize();

    this.swiperList = [
      {
        "url": "https://invitrocolombia.com.co/wp-content/uploads/2021/03/congelacionEmbriones-2.jpg",
        "title": "Lorem ipsum",
        "name": "Cras nec vestibulum",
        "description": " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
      },
      {
        "url": "https://invitrocolombia.com.co/wp-content/uploads/2021/03/fotoslab5-1024x615.jpg",
        "title": "Lorem ipsum",
        "name": "Cras nec vestibulum",
        "description": "Duis aute irure dolor in reprehenderit in voluptate"
      },
      {
        "url": "https://res.cloudinary.com/deueufyac/image/upload/v1657400249/e-commerce/162435765_194372269158134_2879542145092440238_n_y4uu2d.jpg",
        "title": "Lorem ipsum",
        "name": "Cras nec vestibulum",
        "description": "Duis aute irure dolor in reprehenderit in voluptate"
      },
    ];

    this.newProducts = this.productsApi.mockNewProducts();

    this.colaborationList = [{
      "url_image": "https://res.cloudinary.com/deueufyac/image/upload/v1658008028/e-commerce/foto1_xfofey.png",
      "title": "Gran servicio",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut posuere magna. In hac habitasse platedictumst. In sed consequat turpis",
      "product": "HOUSAM0000 9123 DOB 12/08/2010",
      "name": "Ana Rojas",
      "qualification": 3,
      "date": "Miércoles, Jun 28, 2022"
    },
    {
      "url_image": "https://res.cloudinary.com/deueufyac/image/upload/v1658008028/e-commerce/foto2_qfwcmt.png",
      "title": "Buen producto",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut posuere magna. In hac habitasse platedictumst. In sed consequat turpis",
      "product": "HOUSAM0000 9123 DOB 12/08/2010",
      "name": "Luis Torres",
      "qualification": 4,
      "date": "Miércoles, Jun 28, 2022"
    },
    {
      "url_image": "https://res.cloudinary.com/deueufyac/image/upload/v1658008028/e-commerce/foto3_ef0rpq.png",
      "title": "Gran servicio",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut posuere magna. In hac habitasse platedictumst. In sed consequat turpis",
      "product": "HOUSAM0000 9123 DOB 12/08/2010",
      "name": "Pedro López",
      "qualification": 5,
      "date": "Miércoles, Jun 28, 2022"
    },
    {
      "url_image": "https://transjalu.com/wp-content/uploads/2021/12/2-1-150x150.jpg",
      "title": "CONSULTORA JUST",
      "comment": "He tenido un servicio de atención al cliente increíble, soy una consultora habitual.",
      "product": "HOUSAM0000 9123 DOB 12/08/2010",
      "name": "Monica Rodriguez",
      "qualification": 5,
      "date": "Sábado, Jun 25, 2022"
    },
    {
      "url_image": "https://transjalu.com/wp-content/uploads/2021/12/1-2-150x150.jpg",
      "title": "CLIENTE",
      "comment": "Fueron muy profesionales. Todos, desde el gerente hasta los técnicos de servicio, son muy amables e intentan ayudarlo. Fue una buena experiencia",
      "product": "HOUSAM0000 9123 DOB 12/08/2010",
      "name": "Carlos Garcia",
      "qualification": 5,
      "date": "Sábado, Jun 25, 2022"
    }

    ];

    this.setColaborationFilterList(this.sectionColaboration);
  }

  changeColaborationSection(section) {

    let leftSide = this.sectionColaboration > section;
    this.sectionColaboration = section;
    this.setColaborationFilterList(this.sectionColaboration);

    if (leftSide) {
      this.animation = this.animationCtrl.create()
        .addElement(document.querySelector('.colaboration-container'))
        .duration(1000)
        //.iterations(Infinity)
        .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
        .fromTo('opacity', '0.2', '1');

    }
    else {
      this.animation = this.animationCtrl.create()
        .addElement(document.querySelector('.colaboration-container'))
        .duration(1000)
        //.iterations(Infinity)
        .fromTo('transform', 'translateX(100px)', 'translateX(0px)')
        .fromTo('opacity', '0.2', '1');
    }
    this.animation.play();
  }

  setColaborationFilterList(section) {
    let tempList = this.colaborationList.filter((value, index) => {
      index = index + 1;
      //console.log('index[' + index + '],[' + (index >= 1 + (section - 1) * 3) + '],[' + (index <= section * 3) + '],[' + (index >= 1 + (section - 1) * 3 && index <= section * 3) + ']');
      return index >= 1 + (section - 1) * 3
        && index <= section * 3;
    });
    if (this.colaborationFilterList[1]) this.colaborationFilterList[1].noShow = true;
    if (this.colaborationFilterList[2]) this.colaborationFilterList[2].noShow = true;
    tempList.forEach((colaboration, indx) => {
      this.colaborationFilterList[indx] = colaboration;
      this.colaborationFilterList[indx].noShow = false;
    });

  }

  productListInitialize() {
    this.productList = this.productsApi.mockNewProducts();
    let mbControl = false;
    this.categorySales = [];

    for(let product of this.productList) {
      mbControl = false;
      for(let category of this.categorySales)  {
        if(category.id == product.category.id) {
          mbControl = true;
        } 
      }
      if(!mbControl) {
        this.categorySales.push(product.category);
      }
    }

    this.onChangeCategorySale();
  }

  onChangeCategorySale(){

    this.animation = this.animationCtrl.create()
    .addElement(document.querySelector('.new-product-sales'))
    .duration(1000)
    .fromTo('opacity', '0.3', '1');


    this.categorySales.forEach((category:any)=>{
      category.active =  category.id == this.categorySaleSelected;
    });

    this.productListFiltered = this.productList.filter((product)=>{
       return product.category && product.category.id == this.categorySaleSelected;
    });

    this.animation.play();

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.largeScreen = event.target.innerWidth >= 800;
  }

}
