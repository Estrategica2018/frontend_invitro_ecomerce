import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, timeout, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../environments/environment';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { ServicesService } from './services.service';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanService {

  url = SERVER_URL;
  ORDER = "preNewOrder";
  errors: string;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private servicesService: ServicesService) {
   
  }

  list(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${SERVER_URL}/api/app`)
        .pipe(
          timeout(60000),
          catchError((e: any) => {
            if (e.status && e.statusText) {
              throw new Error(`Consultando el servicio de planes de suscripción: ${e.status} - ${e.statusText}`);
            }
            else {
              throw new Error(`Consultando el servicio de planes de suscripción`);
            }
          })
        )
        .subscribe((data: any) => {
          this.servicesService.getServices().then((services) => {
            this.mockSubscriptionPlans(services).then((dataMock) => {
              resolve(dataMock);
            });
          }, (error) => { this.errors = error });
          

        }, error => reject(error));

    });
  }

  setOrder(userDataSession: any): Promise<boolean> {
    if (userDataSession) return this.storage.set(this.ORDER, userDataSession);
    else return this.storage.remove(this.ORDER);
  }

  getOrder(): Promise<boolean> {
    return this.storage.get(this.ORDER);
  }

  mockSubscriptionPlans(services): Promise<any> {
    return new Promise((resolve, reject) => {     

      resolve([{
        "id": 1,
        "name": "Básico",
        "color": "rgb(101,194,0)",
        "categories": [
          { "id": "1", "category": { "id": 1, "name": "Semen Toro" }, "icon": "assets/icon/ICONOS ICO_basico/toro_semen-01.ico", "required": true  },
          { "id": "1", "category": { "id": 2, "name": "Enbrion vaca" }, "icon": "assets/icon/ICONOS ICO_basico/toro_semen-01.ico", "required": false  },
        ],
        "services": [
          { "id": "1", "service": services[0], "icon": "assets/icon/ICONOS ICO_basico/servicio7.ico", "required": false },
          { "id": "2", "service": services[1], "icon": "assets/icon/ICONOS ICO_basico/fertilizacion.ico", "required": false },
          { "id": "3", "service": services[2], "icon": "assets/icon/ICONOS ICO_basico/servicio5.ico", "required": false },
          { "id": "4", "service": services[3], "icon": "assets/icon/ICONOS ICO_basico/sincronizacion-01.ico", "required": false },
          { "id": "5", "service": services[4], "icon": "assets/icon/ICONOS ICO_basico/pren%CC%83ez-01.ico", "required": false },
          { "id": "6", "service": services[5], "icon": "assets/icon/ICONOS ICO_basico/servicio6-01.ico", "required": false },
        ],
        "delivery": { "id": "7",  "name": "Domicilio", "icon": "assets/icon/ICONOS ICO_basico/domicilios-01.ico", "required": true }
      }, {
        "id": 2,
        "name": "Plus",
        "color": "rgb(3,196,169)",
        "categories": [
          { "id": "1", "category": { "id": 1, "name": "Semen Toro" }, "icon": "assets/icon/ICONOS ICO_plus/semen_toro.ico", "required": true  },
          { "id": "1", "category": { "id": 2, "name": "Enbrion vaca" }, "icon": "assets/icon/ICONOS ICO_plus/semen_toro.ico", "required": true  },
        ],
        "services": [
          { "id": "1", "service": services[0], "icon": "assets/icon/ICONOS ICO_plus/servicio7.ico", "required": true },
          { "id": "2", "service": services[1], "icon": "assets/icon/ICONOS ICO_plus/fertilizacion.ico", "required": true },
          { "id": "3", "service": services[2], "icon": "assets/icon/ICONOS ICO_plus/servicio5.ico", "required": false },
          { "id": "4", "service": services[3], "icon": "assets/icon/ICONOS ICO_plus/sincronizacion-01.ico", "required": false },
          { "id": "5", "service": services[4], "icon": "assets/icon/ICONOS ICO_plus/pren%CC%83ez-01.ico", "required": false },
          { "id": "6", "service": services[5], "icon": "assets/icon/ICONOS ICO_plus/servicio6-01.ico", "required": false },         
        ],
        "delivery": { "id": "7", "name": "Domicilio", "icon": "assets/icon/ICONOS ICO_plus/domicilios-01.ico", "required": true }
      }, {
        "id": 3,
        "name": "Premium",
        "color": "rgb(172,194,0)",
        "categories": [
          { "id": "1", "category": { "id": 1, "name": "Semen Toro" }, "icon": "assets/icon/ICONOS ICO_premium/semen_toro.ico", "required": true  },
          { "id": "1", "category": { "id": 2, "name": "Enbrion vaca" }, "icon": "assets/icon/ICONOS ICO_premium/semen_toro.ico", "required": true  },
        ],
        "services": [
          { "id": "1", "service": services[0], "icon": "assets/icon/ICONOS ICO_premium/servicio7.ico", "required": true },
          { "id": "2", "service": services[1], "icon": "assets/icon/ICONOS ICO_premium/fertilizacion.ico", "required": true },
          { "id": "3", "service": services[2], "icon": "assets/icon/ICONOS ICO_premium/servicio5.ico", "required": true },
          { "id": "4", "service": services[3], "icon": "assets/icon/ICONOS ICO_premium/sincronizacion-01.ico", "required": true },
          { "id": "5", "service": services[4], "icon": "assets/icon/ICONOS ICO_premium/pren%CC%83ez-01.ico", "required": true },
          { "id": "6", "service": services[5], "icon": "assets/icon/ICONOS ICO_premium/servicio6-01.ico", "required": true },         
        ],
        "delivery": { "id": "7",  "name": "Domicilio", "icon": "assets/icon/ICONOS ICO_premium/domicilios-01.ico", "required": true }
      }]);
    });
  }
}

