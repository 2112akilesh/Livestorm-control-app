import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { Storage } from '@capacitor/storage';

const API_TOKEN = 'my-api-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  apiToken = '';

  constructor() {
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

  async login(credentials: {apiToken}) {
    await Storage.set({ key: API_TOKEN, value: credentials.apiToken });
    console.log(credentials.apiToken);
    tap(_ => {
      this.isAuthenticated.next(true);
    });
  }

  async logout() {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: API_TOKEN });
  }
}
