import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, SERVER_URL } from '../../environments/environment';
import { map, timeout, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  site = null;

  constructor(private http: HttpClient) { }

  getAppSite() {
    return new Promise((resolve, reject) => {
      this.http.get(`${SERVER_URL}/api/app`)
        .pipe(
          timeout(60000),
          catchError((e: any) => {
            console.log(e);
            if (e.status && e.statusText && e.statusText.indexOf('Gateway Timeout') >= 0) {
              throw new Error(`No está conectado a internet`);
            }
            else if (e.status && e.statusText) {
              throw new Error(`Consultando el servicio de configuración de la app: ${e.status} - ${e.statusText}`);
            }
            else {
              throw new Error(`Consultando el servicio de configuración de la app`);
            }
          })
        )
        .subscribe((data: any) => {
          console.log(data);
          resolve(data);
        }, error => reject(error));
    });
  } 
}
