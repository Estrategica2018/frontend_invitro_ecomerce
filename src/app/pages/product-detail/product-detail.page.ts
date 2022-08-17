import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './../../providers/loading.service';
import { UsersService } from './../../api/users.service';
import { ProductsService } from './../../api/products.service';
import { ActivatedRoute } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  product: any;
  errors: string;  
  urlSelect: String;
  animation: Animation;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loading: LoadingService,
    private usersService: UsersService,
    private productsService: ProductsService,
    private animationCtrl: AnimationController,
  ) { }

  ngOnInit() {

    let productId = this.route.snapshot.paramMap.get('productId');
    this.loading.present({ message: 'Cargando...' });

    this.productsService.getProduct(productId)
      .then((productDetail: any) => {
        this.loading.dismiss();
        this.product = productDetail;
        if(this.product && this.product.images && this.product.images.length > 0 ) {
          this.onUrlSelect(this.product.images[0]);
        }
      }, error => {
        this.loading.dismiss();
        this.errors = error
      });
  }

  onUrlSelect(url) {

    this.animation = this.animationCtrl.create()
    .addElement(document.querySelector('.image-selected'))
    .duration(1000)
    .fromTo('opacity', '0.3', '1');

    this.urlSelect = url;
    this.animation.play();
  }


}
