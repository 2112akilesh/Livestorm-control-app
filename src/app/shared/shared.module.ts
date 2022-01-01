import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

//Importing routing module
import {PopoverRoutingModule} from './popover-controller/popover-routing.module';

//Importing the component
import {DarkModeToggleComponent} from './pages/settings/dark-mode-toggle/dark-mode-toggle.component';
import {PopoverControllerComponent} from './popover-controller/popover-controller.component';
import {PopoverDialogueComponent} from './popover-controller/popover-dialogue.component';

//Importing pages
import { SettingsPage } from './pages/settings/settings.page';

@NgModule({
    declarations: [
      DarkModeToggleComponent,
      PopoverControllerComponent,
      PopoverDialogueComponent,
      SettingsPage,
    ],
    imports: [
      IonicModule,
      CommonModule,
      PopoverRoutingModule,          //Routing module
    ],
    exports: [
      DarkModeToggleComponent,
      PopoverControllerComponent,
      PopoverDialogueComponent,
      SettingsPage,
    ]
  })

export class SharedModule { }
