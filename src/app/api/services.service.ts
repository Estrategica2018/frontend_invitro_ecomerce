import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, timeout, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  //apiUrl = SERVER_URL;
  apiUrl = `https://www.google.com/?hl=es`;
  services = [];

  constructor(
    private http: HttpClient,
    private storage: Storage) {
  }

  getServices(): any {
    return new Promise((resolve, reject) => {
      //this.http.get(`${SERVER_URL}/api/app`)
      this.http.get(this.apiUrl)
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
          resolve(data);
        }, error => {
          reject(error);
        })
    });
  }

  mockServices() {
    return [{
      "id": 1,
      "name": "Evaluación de donadoras y receptoras",
      "url_image": "https://invitrocolombia.com.co/wp-content/uploads/2021/03/DSC_0047-1024x683.jpg"
    }, {
      "id": 2,
      "name": "Sincronización de receptoras",
      "url_image": "https://invitrocolombia.com.co/wp-content/uploads/2021/03/DSC_0227-1024x683.jpg"
    }, {
      "id": 3,
      "name": "Aspiración folicular",
      "url_image": "https://invitrocolombia.com.co/wp-content/uploads/2021/03/aspira1-2-1024x683.jpg"
    }, {
      "id": 4,
      "name": "Fertilización In vitro (FIV)",
      "url_image": "https://invitrocolombia.com.co/wp-content/uploads/2021/03/101-1-1024x683.jpg"
    }, {
      "id": 5,
      "name": "Transferencia de embriones",
      "url_image": "https://invitrocolombia.com.co/wp-content/uploads/2021/03/fotoslab5-1024x615.jpg"
    }, {
      "id": 6,
      "name": "Diagnóstico de gestación y entrega de preñeces",
      "url_image": "https://invitrocolombia.com.co/wp-content/uploads/2021/03/FullSizeRender16-768x554.jpg"
    }, {
      "id": 7,
      "name": "Venta de genética",
      "url_image": "https://invitrocolombia.com.co/wp-content/uploads/2021/03/congelacion-1024x683.jpg"
    }];
  }


}
