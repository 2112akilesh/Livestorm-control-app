import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Storage } from '@capacitor/storage';
import { Http } from '@capacitor-community/http';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { Directory, Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';

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


  public async getFromCamera() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100 // highest quality (0 to 100)
    });

    return this.capturedBase64String = 'data:image/jpeg;base64,' + capturedPhoto.base64String;

    //console.log(this.capturedBase64String);
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
export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}
