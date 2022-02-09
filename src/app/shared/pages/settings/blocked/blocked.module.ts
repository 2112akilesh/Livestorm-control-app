import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlockedPageRoutingModule } from './blocked-routing.module';

import { BlockedPage } from './blocked.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlockedPageRoutingModule
  ],
  declarations: [BlockedPage]
})
export class BlockedPageModule {}
