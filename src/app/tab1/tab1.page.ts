import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform, ActionSheetController } from '@ionic/angular';

//Import capasitor plugin
import { Directory, Filesystem } from '@capacitor/filesystem';
import { CameraSource, Camera, CameraResultType } from '@capacitor/camera';
import { Http, HttpUploadFileResult } from '@capacitor-community/http';

import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
//import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

//importing chat services
import { PubsubService } from '../core/services/post/pubsub.service';
import { ApiService, UserPhoto } from '../core/services/postImage/post-image.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  images = [];

  base64String = '';
  chatMessage = '';

  constructor(
    public pubsubService: PubsubService,
    public apiService: ApiService,
    public actionSheetController: ActionSheetController,
    private filePath: FilePath,
    private fileChooser: FileChooser
  ) { }

  //Button click upload function


  //----------------Services function------------------------
  uploadMessage(chatMessage) {
    const chat = chatMessage;
    this.pubsubService.sendMessage(chat);
    this.chatMessage = '';
  }

  uploadImage(gallary, camera) {
    console.log(gallary, camera);
    if (gallary === null) {
      this.pubsubService.sendImages(this.apiService.capturedBase64String);
      console.log(this.apiService.capturedBase64String);
    } else {
      this.pubsubService.sendImages(this.base64String);
    }
  }

  //----------------capasitor/cordova function-----------------
  takeFromCamera() {
    this.apiService.getFromCamera();
    //console.log (this.apiService.capturedBase64String);
  }

  selectFromGallery() {
    this.fileChooser.open().then((val) => {
      this.filePath.resolveNativePath(val).then((path) => {
        Filesystem.readFile({
          path,
        }).then((base64) => {
          this.base64String = 'data:image/jpeg;base64,' + base64.data;
        });
      });
    });
  }
}
