import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Platform } from '@ionic/angular';



@Injectable({
  providedIn: 'root',
})
export class ApiService {


  base64String:string = '';

  constructor() { }


  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100 // highest quality (0 to 100)
    });

    this.base64String = 'data:image/jpeg;base64,'+capturedPhoto.base64String;

    //console.log(this.base64String);

  }

  public async getGallery() {

  }
}
export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}
