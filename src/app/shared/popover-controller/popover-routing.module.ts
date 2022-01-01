import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetPage } from '../../tabs/meet/meet.page';

// Import Popover page components
import { SettingsPage } from '../pages/settings/settings.page';


const routes: Routes = [
  {
    path: 'settingsPage',
    component: SettingsPage
  },
  {
    path: '**',
    component: MeetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopoverRoutingModule { }
