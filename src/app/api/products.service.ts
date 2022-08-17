import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, timeout, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../environments/environment';

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
      this.http.get(`${SERVER_URL}/api/app`)
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
          resolve(this.mockProducts());
        }, error => {
          reject(error);
        })
    });
  }

  getNewProducts(): any {
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
              throw new Error(`Consultando el servicio de productos disponibles: ${e.status} - ${e.statusText}`);
            }
            else {
              throw new Error(`Consultando el servicio de productos disponibles`);
            }
          })
        )
        .subscribe((data: any) => {
          resolve(this.mockProducts());
        }, error => {
          reject(error);
        })
    });
  }

  getProduct(productId): any {
    return new Promise((resolve, reject) => {
          resolve(this.mockProductDetail());
    });
  }

  mockProducts() {
    return [
      {
        "id": "1", "name": "Toro 1",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx", "category": {"id":1,"name":"Catálogo de semen"},
        "attributes": "Filtro raza 1|filtro 1|otro filtro",
        "qualification" : "5"
      }, {
        "id": "2", "name": "Toro 2",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx","category": {"id":1,"name":"Catálogo de semen"},
        "attributes": "Filtro raza 2|filtro 1|otro filtro",
        "qualification" : "3"
      }, {
        "id": "3", "name": "Toro 3",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx","category": {"id":1,"name":"Catálogo de semen"},
        "attributes": "Filtro raza 3|filtro 2|otro filtro",
        "qualification" : "3"
      }, {
        "id": "4", "name": "Toro 4",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx","category": {"id":2,"name":"Donadoras"},
        "attributes": "Filtro raza 4|filtro 2|otro filtro",
        "qualification" : "4"
      }, {
        "id": "5", "name": "Toro 5",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx","category": {"id":2,"name":"Donadoras"},
        "attributes": "Filtro raza 5|filtro 3|otro filtro",
        "qualification" : "3"
      }, {
        "id": "6", "name": "Toro 6",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx","category": {"id":2,"name":"Donadoras"},
        "attributes": "Filtro raza 6|filtro 3|otro filtro",
        "qualification" : "5"
      },{
        "id": "7", "name": "Toro 7",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx", "category": {"id":1,"name":"Catálogo de semen"},
        "attributes": "Filtro raza 7|filtro 4|otro filtro",
        "qualification" : "2"
      }, {
        "id": "8", "name": "Toro 8",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx","category": {"id":1,"name":"Catálogo de semen"},
        "attributes": "Filtro raza 8|filtro 4|otro filtro",
        "qualification" : "3"
      }, {
        "id": "9", "name": "Toro 9",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx","category": {"id":1,"name":"Catálogo de semen"},
        "attributes": "Filtro raza 9|filtro 5|otro filtro",
        "qualification" : "5"
      }, {
        "id": "10", "name": "Toro 10",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx","category": {"id":2,"name":"Donadoras"},
        "attributes": "Filtro raza 10|filtro 5|otro filtro",
        "qualification" : "4"
      }, {
        "id": "11", "name": "Toro 11",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx","category": {"id":2,"name":"Donadoras"},
        "attributes": "Filtro raza 12|filtro 6|otro filtro",
        "qualification" : "4"
      }]
  }



  mockProductDetail() {
    return {
        "name": "Toro 1",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
        "qualification": "1",
        "images" : [
          "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
          "https://res.cloudinary.com/deueufyac/image/upload/v1660526819/e-commerce/productos/foto_g1wxej.png",
          "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
          "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        ]
      };
  }
}
