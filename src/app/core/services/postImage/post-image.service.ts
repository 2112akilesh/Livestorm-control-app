import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Http } from '@capacitor-community/http';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';




const API_TOKEN = 'my-api-token';

@Injectable({
  providedIn: 'root',
})

export class PostImageService {

  orgId = '';
  apiToken = '';

  capturedBase64String = '';
  constructor() {
    this.loadToken();
  }

  async loadToken() {
    const apiToken = await Storage.get({ key: API_TOKEN });
    if (apiToken && apiToken.value) {
      this.apiToken = apiToken.value;
    }
  }


  //get Images Url from aws s3
  getImagesUrl(postImage): Observable<any> {

    //Body
    const body = {
      base64: `${postImage.base64}`,
      extension: '.jpeg',
      filename: 'Control'
    };

    return from(Http.request({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.apiToken}`
      },
      url: 'https://plugins.livestorm.co/api/v1/medias',
      data: JSON.stringify(body)
    })).pipe(
      map(data =>
        data
      )
    );
  }


  postImage(url: Observable<any>) {
    //Body
    const body = {
      scope: {
        type: 'organization',
        organization_id: `${this.orgId}`
      },
      payload: {
        event: {
          eventName: 'textMessage',
          data: {
            text: `${url}`
          }
        }
      }
    };

    return from(Http.request({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.apiToken}`
      },
      url: 'https://plugins.livestorm.co/api/v1/pub_subs',
      data: JSON.stringify(body)
    })).pipe(
      map(data =>
        data
      )
    );
  }


}

