import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonSlides } from "@ionic/angular";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../../api/app.service';
import { LoadingService } from './../../providers/loading.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  @ViewChild('slides', { static: true }) ionSlides: IonSlides;

  banner: any;
  bannerImage: any;

  slideOpts: any;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private loading: LoadingService) { }

  ionViewWillEnter() {
    window.dispatchEvent(new CustomEvent("onChange:menuSide", { "detail": { "segmentInit": 4 } }));
  }

  ngOnInit() {

    this.loading.present({ message: 'Cargando...' });

    this.appService.getAppSite()
      .then((app: any) => {
        this.loading.dismiss();
        this.initializeContact();
      }, error => {
        this.loading.dismiss();
      });
  }

  initializeContact() {
    this.banner = { "groupMode": true, "size": { "x": 347, "y": 642 }, "contact": { "name": "" }, "backgroundColor": "#ffffff", "fontColor": "#000000", "fontSize": "13", "shadowActivate": true, "shadowRight": -8, "shadowDown": 4, "shadowDisperse": 21, "shadowExpand": -16 };
    this.banner = Object.assign(this._defaultBanner('Contact'), this.banner);
    this.banner.__contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
      subject: ['', Validators.required]
    });

    this.bannerImage = { "size": { "x": 114, "y": 105 }, "position": { "x": 156, "y": 195 }, "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1636592421/sublimacion/celu_blanck_ba9tw0.png" };
    this.bannerImage = Object.assign(this._defaultBanner('Image'), this.bannerImage);
    this.bannerImage.social = [
      { 'text': 'Whatsapp', 'url': 'https://', 'image_url': 'https://res.cloudinary.com/deueufyac/image/upload/v1636595884/sublimacion/ctab_Instagram_jkve9l.png' },
      { 'text': 'Instagram', 'url': 'https://', 'image_url': 'https://res.cloudinary.com/deueufyac/image/upload/v1636595884/sublimacion/ctab_Instagram_jkve9l.png' },
      { 'text': 'Facebook', 'url': 'https://', 'image_url': 'https://res.cloudinary.com/deueufyac/image/upload/v1636595884/sublimacion/ctab_Instagram_jkve9l.png' },
      { 'text': 'Twitter', 'url': 'https://', 'image_url': 'https://res.cloudinary.com/deueufyac/image/upload/v1636595884/sublimacion/ctab_Instagram_jkve9l.png' },
    ];
  }

  _defaultBanner(type) {
    const id = new Date().valueOf();
    const primaryColor = "#007bff";
    return {
      id: id, type: type, border: { "style": "none" },
    }
  }

  contactSendForm(__contactForm) {

  }
}