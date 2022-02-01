import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SessionsPage } from './sessions.page';


const routes: Routes = [
  {
    path: '',
    component: SessionsPage,
  },{
    path: 'chat/:session-id',
    loadChildren: () => import('src/app/shared/pages/chat/chat.module').then(m => m.ChatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionsPageRoutingModule {}
