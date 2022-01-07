import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';

import { DarkModeToggleComponent } from '../../components/dark-mode-toggle/dark-mode-toggle.component';
import { SettingsPageRoutingModule } from './settings-routing.module';
@NgModule({
    declarations: [
        SettingsPage,
        DarkModeToggleComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        SettingsPageRoutingModule
    ],
    exports: [
        SettingsPage
    ]
})
export class SettingsPageModule { }
