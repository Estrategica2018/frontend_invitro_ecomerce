import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, timeout, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../environments/environment';
import { processData } from '../providers/process-data';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  //apiUrl = SERVER_URL;
  apiUrl = `https://www.google.com/?hl=es`;
  services: any;

  constructor(
    private http: HttpClient,
    private storage: Storage) {
  }

  getServices(): any {
    if (false && this.services && this.services.length > 0) {
      return new Promise((resolve, reject) => {
        resolve(this.services);
      });
    }
    else {
      return new Promise((resolve, reject) => {
        this.http.get(`${SERVER_URL}/api/services/list`)
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
          .subscribe((response: any) => {
            if (response.overall_status === 'successfull') {
              this.services = processData(response.data.services);
              resolve(this.services);
            }
            else {
              reject(response.message);
            }
          }, error => {
            reject(error);
          })
      });
    }
  }

  getService(serviceId: string): any {
    return new Promise((resolve, reject) => {
      this.getServices().then(() => {
        for (let service of this.services) {
          if (service.id == serviceId) {
            resolve(service);
          }
        }
        reject('Código de servicio no encontrado');
      });
    });
  }

}
