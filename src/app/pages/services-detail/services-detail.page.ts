import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './../../providers/loading.service';
import { UsersService } from './../../api/users.service';
import { ServicesService } from './../../api/services.service';
import { ActivatedRoute } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-services-detail',
  templateUrl: './services-detail.page.html',
  styleUrls: ['./services-detail.page.scss'],
})
export class ServicesDetailPage implements OnInit {

  service: any;
  errors: string;
  urlSelect: String;
  animation: Animation;
  largeScreen = window.innerWidth >= 768;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private loading: LoadingService,
    private usersService: UsersService,
    private servicesService: ServicesService,
    private animationCtrl: AnimationController,) { }

  ionViewWillEnter() {
    window.dispatchEvent(new CustomEvent("onChange:menuSide", { "detail": { "segmentInit": 2 } }));
  }

  ngOnInit() {

    let serviceId = this.route.snapshot.paramMap.get('serviceId');
    this.loading.present({ message: 'Cargando...' });

    this.servicesService.getService(serviceId)
      .then((serviceDetail: any) => {
        this.loading.dismiss();
        this.service = serviceDetail;
        if (this.service && this.service.images && this.service.images.length > 0) {
          this.onUrlSelect(this.service.images[0]);
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.largeScreen = event.target.innerWidth >= 768;
  }
}
