import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

//Import capasitor plugin
import { Filesystem } from '@capacitor/filesystem';
//import { CameraSource, Camera, CameraResultType } from '@capacitor/camera';
//import { Http, HttpUploadFileResult } from '@capacitor-community/http';

import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
//import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

//importing chat services
import { PubsubService } from '../../core/services/post/pubsub.service';
import { PostImageService } from '../../core/services/postImage/post-image.service';

import chatData from './chats.json';

@Component({
  selector: 'app-event',
  templateUrl: 'event.page.html',
  styleUrls: ['event.page.scss']
})
export class EventPage {

  chats = chatData;


  images = [];

  base64String = '';
  chatMessage = '';

  constructor(
    public pubsubService: PubsubService,
    public postImageService: PostImageService,
    public actionSheetController: ActionSheetController,
    private filePath: FilePath,
    private fileChooser: FileChooser
  ) { }

  //Button click upload function


  //----------------Services function------------------------
  uploadImage(gallary, camera) {
    console.log(gallary, camera);
    if (gallary === null) {
      this.pubsubService.sendImages(this.postImageService.capturedBase64String);
      console.log(this.postImageService.capturedBase64String);
    } else {
      this.pubsubService.sendImages(this.base64String);
    }
  }


  //----------------capasitor/cordova function-----------------
  takeFromCamera() {
    this.postImageService.getFromCamera();
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
