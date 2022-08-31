import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './../../providers/loading.service';
import { UsersService } from './../../api/users.service';
import { ProductsService } from './../../api/products.service';
import { ActivatedRoute } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';
import { NgxImageZoomComponent } from 'ngx-image-zoom';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  product: any;
  errors: string;
  slideImageSelect: any;
  animation: Animation;
  largeScreen = window.innerWidth >= 768;
  imageLoading = false;
  @ViewChild(NgxImageZoomComponent)
  imageZoom: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loading: LoadingService,
    private usersService: UsersService,
    private productsService: ProductsService,
    private animationCtrl: AnimationController,
  ) { }

  ionViewWillEnter() {
    window.dispatchEvent(new CustomEvent("onChange:menuSide", { "detail": { "segmentInit": 3 } }));
  }

  ngOnInit() {

    let productId = this.route.snapshot.paramMap.get('productId');

    this.loading.present({ message: 'Cargando...' });

    this.productsService.getProduct(productId)
      .then((productDetail: any) => {

        if (typeof productDetail.slide_images_url == 'string') {
          try { productDetail.slide_images_url = JSON.parse(productDetail.slide_images_url); } catch (e) { console.log(e); }
        }

        this.loading.dismiss();
        this.product = productDetail;
        if (this.product && this.product.slide_images_url && this.product.slide_images_url.length > 0) {
          this.onUrlSelect(this.product.slide_images_url[0]);
        }
      }, error => {
        this.loading.dismiss();
        this.errors = error
      });
  }

  onUrlSelect(slideImage) {

    this.animation = this.animationCtrl.create()
      .addElement(document.querySelector('.image-selected'))
      .duration(1000)
      .fromTo('opacity', '0.3', '1');

    this.slideImageSelect = slideImage;
    this.animation.play();
    this.imageLoading = false;

    setTimeout(() => {
      this.imageLoading = true;
      this.InitializeZoom(slideImage);
    }, 200);
  }

  InitializeZoom(slideImage) {
    if (slideImage.thumb) {
      this.imageZoom.thumbImage = slideImage.thumb;
      this.imageZoom.fullImage = slideImage.zoom;
    }
    if (document.querySelector<HTMLElement>("lib-ngx-image-zoom .ngxImageZoomContainer")) {
      document.querySelector<HTMLElement>("lib-ngx-image-zoom .ngxImageZoomContainer").style.width = 'auto';
      document.querySelector<HTMLElement>("lib-ngx-image-zoom .ngxImageZoomContainer").style.height = 'auto';
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {

    this.largeScreen = event.target.innerWidth >= 768;

  }
}
