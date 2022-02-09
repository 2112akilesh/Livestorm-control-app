import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

//Importing routing module
import { RouterModule } from '@angular/router';

//Importing the component
import { PopoverControllerComponent } from './components/popover-controller/popover-controller.component';
import { PopoverDialogueComponent } from './components/popover-controller/popover-dialogue.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ListSessionComponent } from './components/list-session/list-session.component';
import { EditApiKeyComponent } from './pages/settings/components/edit-api-key/edit-api-key.component';


//Importing pages
import { SettingsPageModule } from './pages/settings/settings.module';
import { ChatPageModule } from './pages/chat/chat.module';

@NgModule({
  declarations: [
    PopoverControllerComponent,
    PopoverDialogueComponent,
    LogoutComponent,
    ListSessionComponent,
    EditApiKeyComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,          //Routing module
    SettingsPageModule,
    ChatPageModule
  ],
  exports: [
    PopoverControllerComponent,
    PopoverDialogueComponent,
    LogoutComponent,
    ListSessionComponent,
    EditApiKeyComponent,
  ],
  providers: [LogoutComponent],
})

export class SharedModule { }
