import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { IonRefresher } from '@ionic/angular';

//Import capasitor plugin
import { Filesystem } from '@capacitor/filesystem';
//import { CameraSource, Camera, CameraResultType } from '@capacitor/camera';
//import { Http, HttpUploadFileResult } from '@capacitor-community/http';

import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
//import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

//importing services
import { PubsubService } from '../../core/services/post/pubsub.service';
import { PostImageService } from '../../core/services/postImage/post-image.service';

//import components
import { ListSessionComponent } from 'src/app/shared/components/list-session/list-session.component';


@Component({
  selector: 'app-sessions',
  templateUrl: 'sessions.page.html',
  styleUrls: ['sessions.page.scss']
})
export class SessionsPage implements OnInit {

  @ViewChild(IonRefresher) ionRefresher: IonRefresher;
  @ViewChild(ListSessionComponent) listSessionComponent: ListSessionComponent;
  images = [];

  base64String = '';
  chatMessage = '';
  noOfSession = 0;
  count = 1;
  refresh=false;

  constructor(
    public pubsubService: PubsubService,
    public postImageService: PostImageService,
    public actionSheetController: ActionSheetController,
  ) { }

  async ngOnInit() {
  }

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

  //----------------Test list of sessions------------------------


  getImage(sessionId) {
    //this.sessionsService.getSessionsUserIcon(sessionId);
    this.count = this.count + 1;
    console.log(this.count);
  }

  async doRefresh(event) {
    console.log('Begin async operation');
    this.refresh=true;
    this.listSessionComponent.ngOnInit();
    setTimeout( async () => {
      this.refresh=false;
      console.log('Async operation has ended');
      await this.ionRefresher.complete();
    }, 2000);

  }

}
