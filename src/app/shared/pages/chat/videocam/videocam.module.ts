import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

import { VideocamPageRoutingModule } from './videocam-routing.module';
import { VideocamPage } from './videocam.page';
import { CoreModule } from 'src/app/core/core.module';

import { StreamComponent } from '../shared/components/stream/stream.component';
import { OpenViduVideoComponent } from '../shared/components/stream/ov-video.component';
import { SettingUpModalComponent } from '../shared/components/setting-up-modal/setting-up-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideocamPageRoutingModule,
    CoreModule
  ],
  declarations: [
    VideocamPage,
    OpenViduVideoComponent,
    StreamComponent,
    SettingUpModalComponent
  ],
  providers: [
    AndroidPermissions
  ]
})
export class VideocamPageModule { }
