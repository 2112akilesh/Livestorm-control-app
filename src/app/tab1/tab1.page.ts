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
import { empty } from 'rxjs';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  base64String: string = '';
  chatMessage='';
  constructor(
    public pubsubService: PubsubService,
    public apiService: ApiService,
    public actionSheetController: ActionSheetController,
    private filePath: FilePath,
    private fileChooser: FileChooser
  ) { }

  // async submitForm() {
  //   Http.uploadFile({
  //     url: 'https://plugins.livestorm.co/api/v1/pub_subs',
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhcGkubGl2ZXN0b3JtLmNvIiwianRpIjoiMjVlNGFjYjUtZDliYi00NGIxLWE2YTUtYzNhYjdkMGIzZWMzIiwiaWF0IjoxNjMxNDQwNTY0LCJvcmciOiI2ZTFmOWJiYy1kN2Y5LTQ5ZGEtODM2NC00NWZlZWY0YWI4YWQifQ.NfCm-IC_9zempZIBhiqTI6kNqgzVSk801shnZ1gtSFE'
  //     },
  //     name: 'thorn',
  //     filePath: this.file.name,
  //   });
  // }

  // submitForm() {
  //   return Http.uploadFile({
  //     url: 'https://plugins.livestorm.co/api/v1/pub_subs',
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhcGkubGl2ZXN0b3JtLmNvIiwianRpIjoiMjVlNGFjYjUtZDliYi00NGIxLWE2YTUtYzNhYjdkMGIzZWMzIiwiaWF0IjoxNjMxNDQwNTY0LCJvcmciOiI2ZTFmOWJiYy1kN2Y5LTQ5ZGEtODM2NC00NWZlZWY0YWI4YWQifQ.NfCm-IC_9zempZIBhiqTI6kNqgzVSk801shnZ1gtSFE'
  //     },
  //     name: '',
  //     filePath: this.file,
  //   });


  //   const uploadFile = async () => {
  //     const options = {
  //       url: 'https://plugins.livestorm.co/api/v1/pub_subs',
  //       name: 'myFile',
  //       filePath: 'document.pdf',
  //       fileDirectory: FilesystemDirectory.Downloads,
  //     };

  //     const response: HttpUploadFileResult = await Http.uploadFile();
  //   };
  // }

  //Button click upload function


  //----------------Services function-----------------
  uploadMessage(chatMessage) {
    const chat = chatMessage;
    this.pubsubService.sendMessage(chat);
    this.chatMessage = '';
  }

  uploadImage(gallary, camera) {
    console.log(gallary, camera);
    if (gallary === empty) {
      this.pubsubService.sendImages(camera);
    } else {
      this.pubsubService.sendImages(this.base64String);
    }
  }

  //----------------capasitor/cordova function-----------------
  addPhotoToGallery() {
    this.apiService.addNewToGallery();
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
