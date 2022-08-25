import { Component, HostListener, OnInit } from '@angular/core';
import { LoadingService } from './../../providers/loading.service';
import { AppService } from '../../api/app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  
  sections: any;
  largeScreen = window.innerWidth >= 768;

  constructor(
    private appService: AppService,
    private loading: LoadingService,
    private router: Router,
  ) { }

  ngOnInit() {
    
    this.loading.present({ message: 'Cargando...' });
    
    this.appService.getAppSite()
      .then((app: any) => {
        this.loading.dismiss();
        this.sections=app.pages.about.sections;
      }, error => {
        this.loading.dismiss();
      });
  }

  goToUrl(url: string) {
    this.router.navigate([url]);
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.largeScreen = event.target.innerWidth >= 768;
  }

}
