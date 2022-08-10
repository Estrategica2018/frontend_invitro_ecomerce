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

  //apiUrl = SERVER_URL;
  apiUrl = `https://www.google.com/?hl=es`;
  services = [];

  constructor(
    private http: HttpClient,
    private storage: Storage) {
  }

  getProducs(): any {
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

  mockNewProducts() {
    return [
      {
        "name": "Toro 1",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx", "category": {"id":1,"name":"Catálogo de semen"},
        "attributes": "Filtro raza 1|Filtro raza 2|otro filtro"
      }, {
        "name": "Toro 2",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx","category": {"id":1,"name":"Catálogo de semen"},
        "attributes": "Filtro raza 4|Filtro raza 2|otro filtro"
      }, {
        "name": "Toro 3",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx","category": {"id":1,"name":"Catálogo de semen"},
        "attributes": "Filtro raza 1|Propósito carne|otro filtro"
      }, {
        "name": "Toro 4",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx","category": {"id":2,"name":"Donadoras"},
        "attributes": "Propósito carne|Propósito leche|otro filtro"
      }, {
        "name": "Toro 5",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx","category": {"id":2,"name":"Donadoras"},
        "attributes": "Filtro raza 4|Filtro raza 2|otro filtro"
      }, {
        "name": "Toro 6",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx","category": {"id":2,"name":"Donadoras"},
        "attributes": "Filtro raza 1|Filtro raza 2|otro filtro"
      }]
  }


  mockProducts() {
    return [
      {
        "name": "Toro 1",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      }, {
        "name": "Toro 2",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      }, {
        "name": "Toro 3",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      }, {
        "name": "Toro 4",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      }, {
        "name": "Toro 5",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      }, {
        "name": "Toro 6",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      },
      {
        "name": "Toro 1",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      }, {
        "name": "Toro 2",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      }, {
        "name": "Toro 3",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      }, {
        "name": "Toro 4",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      }, {
        "name": "Toro 5",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      }, {
        "name": "Toro 6",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      },
      {
        "name": "Toro 1",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      }, {
        "name": "Toro 2",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      }, {
        "name": "Toro 3",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      }, {
        "name": "Toro 4",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      }, {
        "name": "Toro 5",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      }, {
        "name": "Toro 6",
        "image_url": "https://res.cloudinary.com/deueufyac/image/upload/v1657475699/e-commerce/productos/Sin_t%C3%ADtulo_cyeyli.png",
        "attr1": "HOUSAM0000 9123",
        "attr2": "DOB 12/08/2010",
        "price": "$xxxxxxx",
      }];
  }

}
