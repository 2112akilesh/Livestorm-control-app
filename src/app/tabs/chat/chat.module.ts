import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatPage } from './chat.page';

import { ChatPageRoutingModule } from './chat-routing.module';

//declaring services
import { PubsubService } from '../../core/services/post/pubsub.service';
import { ApiService } from '../../core/services/postImage/post-image.service';


import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { FileSenderComponent } from '../../shared/components/file-sender/file-sender.component';

// Importing shared module
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChatPageRoutingModule,
    SharedModule
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
