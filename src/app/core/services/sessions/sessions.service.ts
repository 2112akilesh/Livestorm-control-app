import { Injectable } from '@angular/core';
import { Http, HttpOptions } from '@capacitor-community/http';
import { from, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


const options: HttpOptions = {
  url: 'https://api.livestorm.co/v1/sessions',
  headers: {
    Accept: 'application/vnd.api+json',
    Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhcGkubGl2ZXN0b3JtLmNvIiwianRpIjoiMjQxOGUwMWEtNjJiNi00ZjMxLTkxMDAtNDM0MTUxNzg5ZmM1IiwiaWF0IjoxNjMxNjI3NzQxLCJvcmciOiI2ZTFmOWJiYy1kN2Y5LTQ5ZGEtODM2NC00NWZlZWY0YWI4YWQifQ.P9R_xgv-kG-FwT4h2BtrJCrE-QAtUt-rFOiBwOzBELM'
  }
};

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/vnd.api+json',
    Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhcGkubGl2ZXN0b3JtLmNvIiwianRpIjoiMjQxOGUwMWEtNjJiNi00ZjMxLTkxMDAtNDM0MTUxNzg5ZmM1IiwiaWF0IjoxNjMxNjI3NzQxLCJvcmciOiI2ZTFmOWJiYy1kN2Y5LTQ5ZGEtODM2NC00NWZlZWY0YWI4YWQifQ.P9R_xgv-kG-FwT4h2BtrJCrE-QAtUt-rFOiBwOzBELM'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private http: HttpClient) { }

  // async listSessions(){
  //   const response = await Http.request({ ...options, method: 'GET' });
  //   return response;
  // }

  listSessions(): Observable<any> {
    const url = 'https://api.livestorm.co/v1/sessions';
    return from(this.http.get(url, httpOptions)).pipe(
      map(data => {
        //console.log(data);
        return data;
      })
    );
  }

  getSessionsUserIcon(sessionId: string): Observable<any> {
    const url = `https://api.livestorm.co/v1/sessions/${sessionId}/users`;
    return from(this.http.get(url, httpOptions))
    .pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }
}
