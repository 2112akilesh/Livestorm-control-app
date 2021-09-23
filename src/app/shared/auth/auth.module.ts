import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';

//import { RiveModule } from 'ng-rive';
//Importing modules from tab 1 & 2
import { Tab1PageRoutingModule } from 'src/app/tab1/tab1-routing.module';
import { Tab2PageRoutingModule } from 'src/app/tab2/tab2-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthPageRoutingModule,
    Tab1PageRoutingModule,
    Tab2PageRoutingModule
  ],
  declarations: [AuthPage],
})
export class AuthPageModule {}
