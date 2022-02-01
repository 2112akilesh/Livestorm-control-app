import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SessionsService} from './services/sessions/sessions.service';



@NgModule({
  imports: [
    CommonModule
  ],
  providers :[
    SessionsService
  ]
})

export class CoreModule { }
