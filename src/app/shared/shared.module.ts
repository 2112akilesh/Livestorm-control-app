import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

//Importing routing module
import { RouterModule } from '@angular/router';

//Importing the component
import {PopoverControllerComponent} from './components/popover-controller/popover-controller.component';
import {PopoverDialogueComponent} from './components/popover-controller/popover-dialogue.component';

//Importing pages
import { SettingsPageModule } from './pages/settings/settings.page.module';

@NgModule({
    declarations: [
      PopoverControllerComponent,
      PopoverDialogueComponent,
    ],
    imports: [
      IonicModule,
      CommonModule,
      RouterModule,          //Routing module
      SettingsPageModule
    ],
    exports: [
      PopoverControllerComponent,
      PopoverDialogueComponent,
    ]
  })

export class SharedModule { }
