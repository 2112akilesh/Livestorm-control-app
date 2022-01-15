import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'event',
        loadChildren: () => import('./event/event.module').then(m => m.EventPageModule)
      },
      {
        path: 'meet',
        loadChildren: () => import('./meet/meet.module').then(m => m.MeetPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../shared/pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/event',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/event',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
