import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideocamPageRoutingModule } from './videocam-routing.module';

import { VideocamPage } from './videocam.page';

import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

import { OpenViduVideoComponent } from './ov-video.component';
import { UserVideoComponent } from './user-video.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideocamPageRoutingModule
  ],
  declarations: [
    VideocamPage,
    UserVideoComponent,
    OpenViduVideoComponent
  ],
  providers: [
    AndroidPermissions
  ]
})
export class VideocamPageModule { }
