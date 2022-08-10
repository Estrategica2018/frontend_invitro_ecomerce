import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './../../providers/loading.service';
import { UsersService } from './../../api/users.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loading: LoadingService,
    private usersService: UsersService

  ) {

  }

  ngDoCheck() {
    document.querySelector<HTMLElement>('ion-router-outlet').style.top = '0px';
  }

  ngOnInit() {

    let token = this.route.snapshot.paramMap.get('token');
    this.loading.present({ message: 'Cargando...' });

    this.goToUrl('Inicio');
    
    if (token) {
      this.usersService.findPassword(token)
        .then(data => {
          this.loading.dismiss();
          let email = data.email;
          data = { "emailRecovery": email, "token": token, "errors": null };
          window.dispatchEvent(new CustomEvent('show:recovery-token-modal', { detail: data }));
          this.goToUrl('Inicio');
        },
          error => {
            this.loading.dismiss();
            this.usersService.getUser().then((userDataSession: any) => {
              const email = userDataSession ? userDataSession.email : null;
              let data = { "emailRecovery": email, "errors": error.message };
              window.dispatchEvent(new CustomEvent('show:recovery-modal', { detail: data }));
            });
          });
    }
    else {
      this.loading.dismiss();
      this.usersService.getUser().then((userDataSession: any) => {
        const email = userDataSession ? userDataSession.email : null;
        let data = { "emailRecovery": email, "errors": "El link de recuperación de clave no existe o está vencido" };
        window.dispatchEvent(new CustomEvent('show:recovery-modal', { detail: data }));
      });
    }
  }

  goToUrl(url: string) {
    this.router.navigate([url]);
  }


}
