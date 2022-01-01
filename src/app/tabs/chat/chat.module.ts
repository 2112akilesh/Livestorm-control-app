import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatPage } from './chat.page';

import { Tab1PageRoutingModule } from './chat-routing.module';

//declaring services
import { PubsubService } from '../../core/services/post/pubsub.service';
import { ApiService } from '../../core/services/postImage/post-image.service';


import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { FileSenderComponent } from '../../shared/file-sender/file-sender.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
  ],
  declarations: [
    ChatPage,
    FileSenderComponent
  ],
  providers: [
    PubsubService,
    ApiService,
    FilePath,
    FileChooser,
    Camera
  ]
})
export class ChatPageModule { }
