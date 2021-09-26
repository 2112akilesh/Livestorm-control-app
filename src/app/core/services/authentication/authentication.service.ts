import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

import { Storage } from '@capacitor/storage';

const TOKEN_KEY = 'my-token';
const API_TOKEN = 'my-api-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  apiToken = '';

  constructor() {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    const apiToken = await Storage.get({ key: API_TOKEN });
    if (token && token.value && apiToken && apiToken.value) {
      //console.log('set token: ', token.value);
      this.token = token.value;
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

  async login(credentials: {organizationId;apiToken}) {

    await Storage.set({ key: TOKEN_KEY, value: credentials.organizationId });
    await Storage.set({ key: API_TOKEN, value: credentials.apiToken });
    console.log(credentials.organizationId, credentials.apiToken);
    tap(_ => {
      this.isAuthenticated.next(true);
    });
  }

  async logout() {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: TOKEN_KEY }) && Storage.remove({ key: API_TOKEN });
  }
}
