import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';

//import { RiveModule } from 'ng-rive';
//Importing modules from tab 1 & 2
import { SessionsPageRoutingModule } from 'src/app/tabs/sessions/sessions-routing.module';
import { EventsPageRoutingModule } from 'src/app/tabs/events/events-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthPageRoutingModule,
    SessionsPageRoutingModule,
    EventsPageRoutingModule
  ],
  declarations: [AuthPage],
})
export class AuthPageModule {}
