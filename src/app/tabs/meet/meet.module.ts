import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeetPage } from './meet.page';

import { Tab2PageRoutingModule } from './meet-routing.module';



//Importing capasitor storage services
import { AuthenticationService } from '../../core/services/authentication/authentication.service';


//Importing shared Module
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    SharedModule                     //Import shared module
  ],
  declarations: [
    MeetPage
  ],
  providers: [AuthenticationService],
})
export class MeetPageModule {}
