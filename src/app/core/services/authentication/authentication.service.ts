import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Storage } from '@capacitor/storage';

import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, from, iif } from 'rxjs';

const API_TOKEN = 'my-api-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  // change it to null after the test
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  apiToken = '';

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const apiToken = await Storage.get({ key: API_TOKEN });

    if (apiToken && apiToken.value) {
      //console.log('set token: ', apiToken.value);
      this.apiToken = apiToken.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }


  // async get(val: string): Promise<any> {
  //   const item = await Storage.get({ key: val });
  //   return JSON.parse(item.value);
  // }

  login(credentials: { apiToken }): Observable<any> {


    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
        Authorization: credentials.apiToken
      })
    };


    return from(this.http.get('https://api.livestorm.co/v1/ping', httpOptions))
      .pipe(
        map(data => data),
        //error handling in rxjs
        tap(data => {
          if (Object.keys(data).length === 0) {
            Storage.set({ key: API_TOKEN, value: credentials.apiToken });
          }
          this.isAuthenticated.next(true);
        })
        // tap(_ => {
        //   this.isAuthenticated.next(true);
        // })
      );
        Storage.set({ key: API_TOKEN, value: credentials.apiToken });
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: API_TOKEN });
  }

}
