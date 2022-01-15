import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';

//import { RiveModule } from 'ng-rive';
//Importing modules from tab 1 & 2
import { EventPageRoutingModule } from 'src/app/tabs/event/event-routing.module';
import { MeetPageRoutingModule } from 'src/app/tabs/meet/meet-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthPageRoutingModule,
    EventPageRoutingModule,
    MeetPageRoutingModule
  ],
  declarations: [AuthPage],
})
export class AuthPageModule {}
