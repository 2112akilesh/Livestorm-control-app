import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionsPage } from './sessions.page';

import { SessionsPageRoutingModule } from './sessions-routing.module';

//declaring services
import { PubsubService } from '../../core/services/post/pubsub.service';
import { PostImageService } from '../../core/services/postImage/post-image.service';


import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Camera } from '@ionic-native/camera/ngx';


// Importing shared module
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SessionsPageRoutingModule,
    SharedModule                      //Importing shared module
  ],
  declarations: [
    SessionsPage
  ],
  providers: [
    PubsubService,
    PostImageService,
    FilePath,
    FileChooser,
    Camera
  ]
})
export class SessionsPageModule { }
