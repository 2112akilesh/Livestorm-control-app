import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Platform } from '@ionic/angular';



@Injectable({
  providedIn: 'root',
})
export class PostImageService {


  capturedBase64String = '';

  constructor() { }


  public async getFromCamera() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100 // highest quality (0 to 100)
    });

    return this.capturedBase64String = 'data:image/jpeg;base64,'+ capturedPhoto.base64String;

    //console.log(this.capturedBase64String);
  }

}
export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}
