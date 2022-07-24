import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, timeout, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';
import { processDataToString } from '../../providers/process-data';
import { processData } from '../../providers/process-data';
import { UsersService } from '../users.service';
import { environment, SERVER_URL } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppAdminService {

  constructor(
    private http: HttpClient,
    private usersService: UsersService
  ) { }
 
  updateTermsAndCondition(termsAndCondition: any): any {
    return new Promise((resolve, reject) => {
        this.usersService.getUser().then((userDataSession: any)=>{
            const httpOptions = {
              headers: new HttpHeaders({
                  'Authorization':  'Bearer ' + userDataSession.token
              })
            };
            const newTermsAndCondition = processDataToString(termsAndCondition);
            this.http.post(`${SERVER_URL}/api/fair/updateTermsAndCondition`,newTermsAndCondition,httpOptions)
            .pipe(
              timeout(60000),
              catchError((e: any) => {
                const msg = (e.error && e.error.message) ? e.error.message : e.status + ' - ' + e.statusText;
                throw new Error(`${msg}`);
              })
            )
            .subscribe((data : any )=> {
                if(data.success) {
                  resolve(processData(data));
                }
                else {
                    reject(JSON.stringify(data));
                }
            },error => {
                reject(error)
            });
        });
    });
  }  

 
}
