import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventsPage } from './events.page';

import { EventsPageRoutingModule } from './events-routing.module';



//Importing capasitor storage services
import { AuthenticationService } from '../../core/services/authentication/authentication.service';


//Importing shared Module
import { SharedModule } from '../../shared/shared.module';
import {CoreModule} from '../../core/core.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    EventsPageRoutingModule,
    SharedModule,                     //Importing shared module
    CoreModule
  ],
  declarations: [
    EventsPage
  ],
  providers: [AuthenticationService],
})
export class EventsPageModule {}
