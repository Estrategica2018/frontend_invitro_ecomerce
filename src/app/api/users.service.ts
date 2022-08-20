import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, timeout, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = SERVER_URL;
  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(
    private http: HttpClient,
    private storage: Storage) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${SERVER_URL}/api/auth/login`, { email: email, password: password })
      .pipe(
        timeout(60000),
        catchError((e: any) => {
          console.log(e);
          if (e.status === 401) {
            throw new Error(`Usuario o contraseña incorrectos`);
          }
          else if (e.status == 404) {
            throw new Error(`El servicio no se enuentra disponible, por favor intente más tarde`);
          }
          else {
            throw new Error(`Consultando el servicio para iniciar sesión: ${e.status} - ${e.statusText}`);
          }


          return of(null);
        })
      )
    /*.pipe(
       timeout(5000),
       catchError((e: any) => {
        if(e.status == 422) {
          throw new Error(`Usuario o contraseña incorrectos`);
        }
        else {
            if(e.status){
              throw new Error(`Consultando el servicio para el inicio de sesión: ${e.status} - ${e.statusText}`);
             }
             else if(e.message){
              throw new Error(`Consultando el servicio para el inicio de sesión: ${e.name} - ${e.message}`);
             }
        }
       })
     )*/
  }

  logout(userDataSession): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + userDataSession.token
      })
    };

    return this.http.post(`${SERVER_URL}/api/auth/logout`, {}, httpOptions)
      .pipe(
        timeout(60000),
        catchError((e: any) => {
          if (e.status !== 401) {
            if (e.status) {
              throw new Error(`Consultando el servicio para cerrar sesión: ${e.status} - ${e.statusText}`);
            }
            if (e.message) {
              throw new Error(`Consultando el servicio para cerrar sesión: ${e.name} - ${e.message}`);
            }
          }
          return of(null);
        })
      )
  }

  signup(userData: any, code: number): Promise<any> {
    return new Promise((resolve, reject) => {
      userData.origin = window.location.origin;
      this.http.post(`${SERVER_URL}/api/auth/register`, userData)
        .pipe(
          timeout(60000),
          catchError((e: any) => {
            if (e.status == 401) {
              throw new Error(`Usuario ya existe`);
            }
            else {
              if (e.status && e.statusText) {
                throw new Error(`Consultando el servicio para creación del usuario: ${e.status} - ${e.statusText}`);
              }
              else {
                throw new Error(`Consultando el servicio para creación del usuario`);
              }
            }
          })
        )
        .subscribe((data: any) => {
          resolve(data);
        }, error => reject(error));

    });
  }

  isLoggedIn(): Promise<string> {
    return this.storage.get(this.HAS_LOGGED_IN).then((user) => {
      return user;
    });
  }

  setUser(userDataSession: any): Promise<boolean> {
    if (userDataSession) return this.storage.set(this.HAS_LOGGED_IN, userDataSession);
    else return this.storage.remove(this.HAS_LOGGED_IN);
  }

  getUser(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN);
  }

  updateUser(userDataSession: any, userData: any): Promise<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + userDataSession.token
      })
    };

    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/api/user/update`, userData, httpOptions)
        .pipe(
          timeout(60000),
          catchError((e: any) => {
            if (e.status == 422) {
              const message = e.error ? JSON.stringify(e.error) : `${e.status} - ${e.statusText}`;
              throw new Error(`Consultando el servicio para modificar usuario: ${message}`);
            }
            else if (e.status == 404) {
              throw new Error(`Usuario o Email no encontrado`);
            }
            else {
              if (e.status && e.statusText && e.statusText.indexOf('Gateway Timeout') >= 0) {
                throw new Error(`No está conectado a internet`);
              }
              else if (e.status && e.statusText) {
                throw new Error(`Consultando el servicio para modificar usuario: ${e.status} - ${e.statusText}`);
              }
              else {
                throw new Error(`Consultando el servicio para modificar usuario`);
              }
            }
          })
        )
        .subscribe((data: any) => {
          resolve(data);
        }, error => reject(error));

    });
  }

  recoveryPassword(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/api/forgotpassword/create`, data)
        .pipe(
          timeout(60000),
          catchError((e: any) => {
            if (e.status == 422) {
              const message = e.error ? JSON.stringify(e.error) : `${e.status} - ${e.statusText}`;
              throw new Error(`Consultando el servicio para recuperación de clave: ${message}`);
            }
            else if (e.status == 404) {
              throw new Error(`Usuario o Email no encontrado`);
            }
            else {
              if (e.status && e.statusText && e.statusText.indexOf('Gateway Timeout') >= 0) {
                throw new Error(`No está conectado a internet`);
              }
              else if (e.status && e.statusText) {
                throw new Error(`Consultando el servicio para recuperación de clave: ${e.status} - ${e.statusText}`);
              }
              else {
                throw new Error(`Consultando el servicio para recuperación de clave`);
              }
            }
          })
        )
        .subscribe((data: any) => {
          resolve(data);
        }, error => reject(error));

    });
  }

  findPassword(token): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/api/forgotpassword/find`, { token: token })
        .pipe(
          timeout(60000),
          catchError((e: any) => {
            if (e.status == 422) {
              const message = e.error ? JSON.stringify(e.error) : `${e.status} - ${e.statusText}`;
              throw new Error(`Consultando el servicio para recuperación de clave: ${message}`);
            }
            else if (e.status == 404 && e.error && e.error.message) {
              throw new Error(`${e.error.message}`);
            }
            else {
              if (e.status && e.statusText) {
                throw new Error(`Consultando el servicio para recuperación de clave: ${e.status} - ${e.statusText}`);
              }
              else {
                throw new Error(`Consultando el servicio para recuperación de clave`);
              }
            }
          })
        )
        .subscribe((data: any) => {
          if (data.overall_status === 'successfull') {
            resolve(data.data.passwordReset);
          }
          else {
            reject({ "email": data.data.email, "msg": `Consultando el servicio para recuperación de clave` });
          }
        }, error => reject(error));

    });
  }

  resetPassword(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/api/forgotpassword/reset`, data)
        .pipe(
          timeout(60000),
          catchError((e: any) => {
            if (e.status == 422) {
              const message = e.error ? JSON.stringify(e.error) : `${e.status} - ${e.statusText}`;
              throw new Error(`Consultando el servicio para recuperación de clave: ${message}`);
            }
            else if (e.status == 404 && e.error && e.error.message) {
              throw new Error(`${e.error.message}`);
            }
            else {
              if (e.status && e.statusText) {
                throw new Error(`Consultando el servicio para recuperación de clave: ${e.status} - ${e.statusText}`);
              }
              else {
                throw new Error(`Consultando el servicio para recuperación de clave`);
              }
            }
          })
        )
        .subscribe((data: any) => {
          if (data.overall_status === 'successfull') {
            resolve(data);
          }
          else {
            reject(`Consultando el servicio para recuperación de clave`);
          }
        }, error => reject(error));

    });
  }

  getPaymentUser(data, userDataSession) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + userDataSession.token
      })
    };
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/api/payment/user/fair`, data, httpOptions)
        .pipe(
          timeout(60000),
          catchError((e: any) => {
            console.log(e);
            if (e.status && e.statusText) {
              throw new Error(`Consultando el servicio de pagos realizados: ${e.status} - ${e.statusText}`);
            }
            else {
              throw new Error(`Consultando el servicio de pagos realizados`);
            }
          })
        )
        .subscribe((data: any) => {
          resolve(data);
        }, error => {
          reject(error)
        });
    });
  }

  findEmail(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${SERVER_URL}/api/user/find/${email}`)
        .pipe(
          timeout(60000),
          catchError((e: any) => {
            if (e.status && e.statusText) {
              throw new Error(`Consultando el servicio para validación del usuario: ${e.status} - ${e.statusText}`);
            }
            else {
              throw new Error(`Consultando el servicio para validación del usuario`);
            }
          })
        )
        .subscribe((data: any) => {
          resolve(data);
        }, error => reject(error));

    });
  }

  sendSignConfirm(origin: string, email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/api/confirm_email`, { "origin": origin, "email": email })
        .pipe(
          timeout(60000),
          catchError((e: any) => {
            if (e.status && e.statusText) {
              throw new Error(`Consultando el servicio para validación del usuario: ${e.status} - ${e.statusText}`);
            }
            else {
              throw new Error(`Consultando el servicio para validación del usuario`);
            }
          })
        )
        .subscribe((data: any) => {
          resolve(data);
        }, error => reject(error));

    });
  }

  singupValidate(email: string, code: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const data = { 'email': email, 'code': code };
      this.http.post(`${SERVER_URL}/api/validate_confirm_email`, data)
        .pipe(
          timeout(60000),
          catchError((e: any) => {
            if (e.error.message) {
              throw new Error(`Consultando el servicio para validación del usuario: ${e.error.message}`);
            }
            if (e.status && e.statusText) {
              throw new Error(`Consultando el servicio para validación del usuario: ${e.status} - ${e.statusText}`);
            }
            else {
              throw new Error(`Consultando el servicio para validación del usuario`);
            }
          })
        )
        .subscribe((data: any) => {
          resolve(data);
        }, error => reject(error));

    });
  }
}
