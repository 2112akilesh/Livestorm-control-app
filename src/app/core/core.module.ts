import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SessionsService} from './services/sessions/sessions.service';
import { StorageService } from './services/storage/storage.service';
import { PubsubService } from './services/post/pubsub.service';
import { PostImageService } from './services/postImage/post-image.service';
import { GamesService } from './services/games/games.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { TextareaToolsService } from './services/textarea-toolbar/textarea-tools.service';
import { OpenViduService } from './services/open-vidu/open-vidu.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers :[
    SessionsService,
    StorageService ,
    PostImageService,
    PubsubService,
    GamesService,
    AuthenticationService,
    TextareaToolsService,
    OpenViduService
  ]
})

export class CoreModule { }
