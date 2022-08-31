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
export class ProductsService {

  apiUrl = SERVER_URL;
  services = [];
  
  constructor(
    private http: HttpClient,
    private storage: Storage) {
  }

  getProducts(): any {
    return new Promise((resolve, reject) => {
      this.http.get(`${SERVER_URL}/api/products/list`)
        .pipe(
          timeout(60000),
          catchError((e: any) => {
            console.log(e);
            if (e.status && e.statusText && e.statusText.indexOf('Gateway Timeout') >= 0) {
              throw new Error(`No está conectado a internet`);
            }
            else if (e.status && e.statusText) {
              throw new Error(`Consultando el servicio de productos disponibles: ${e.status} - ${e.statusText}`);
            }
            else {
              throw new Error(`Consultando el servicio de productos disponibles`);
            }
          })
        )
        .subscribe((response: any) => {
          if (response.overall_status === 'successfull') {
            resolve(processData(response.data.product));
          }
          else {
            reject(response.message);
          }
        }, error => {
          reject(error);
        })
    });
  }

  getNewProducts(): any {
    return new Promise((resolve, reject) => {
      this.http.get(`${SERVER_URL}/api/products/list`)
        .pipe(
          timeout(60000),
          catchError((e: any) => {
            console.log(e);
            if (e.status && e.statusText && e.statusText.indexOf('Gateway Timeout') >= 0) {
              throw new Error(`No está conectado a internet`);
            }
            else if (e.status && e.statusText) {
              throw new Error(`Consultando el servicio de productos disponibles: ${e.status} - ${e.statusText}`);
            }
            else {
              throw new Error(`Consultando el servicio de productos disponibles`);
            }
          })
        )
        .subscribe((response: any) => {
          if (response.overall_status === 'successfull') {
            resolve(processData(response.data.product));
          }
          else {
            reject(response.message);
          }
        }, error => {
          reject(error);
        })
    });
  }

  getProduct(productId): any {
    return new Promise((resolve, reject) => {
      this.http.get(`${SERVER_URL}/api/products/get/${productId}`)
        .pipe(
          timeout(60000),
          catchError((e: any) => {
            console.log(e);
            if (e.status && e.statusText && e.statusText.indexOf('Gateway Timeout') >= 0) {
              throw new Error(`No está conectado a internet`);
            }
            else if (e.status && e.statusText) {
              throw new Error(`Consultando el servicio de productos disponibles: ${e.status} - ${e.statusText}`);
            }
            else {
              throw new Error(`Consultando el servicio de productos disponibles`);
            }
          })
        )
        .subscribe((data: any) => {

          resolve(processData(data.data.product));
        }, error => {
          reject(error);
        })
    });
  }
}
