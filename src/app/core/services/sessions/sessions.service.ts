import { Injectable, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

//Importing services
import { StorageService } from '../storage/storage.service';




const API_TOKEN = 'my-api-token';
@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  apiTokenValue = '';
  public response;

  constructor(private http: HttpClient,
    private storageService: StorageService) {
  }


  async loadToken() {
    //const apiToken = await Storage.get({ key: API_TOKEN });
    const apiToken = await this.storageService.get(API_TOKEN);
    if (apiToken) {
      this.apiTokenValue = apiToken;
    }
  }


  listSessions(): Observable<any> {
    const url = 'https://api.livestorm.co/v1/sessions';
    this.response =  this.storageService.get(API_TOKEN);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
        Authorization: this.apiTokenValue
      })
    };

    return from(this.http.get(url, httpOptions)).pipe(
      map(data =>
        data
      )
    );
  }

  // getSessionsUserIcon(sessionId: string): Observable<any> {
  //   const url = `https://api.livestorm.co/v1/sessions/${sessionId}/users`;
  //   return from(this.http.get(url, httpOptions))
  //     .pipe(
  //       map(data => {
  //         console.log(data);
  //         return data;
  //       })
  //     );
  // }
}
