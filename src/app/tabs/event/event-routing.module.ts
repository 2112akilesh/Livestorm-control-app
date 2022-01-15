import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPage } from 'src/app/shared/pages/chat/chat.page';

import { EventPage } from './event.page';


const routes: Routes = [
  {
    path: '',
    component: EventPage,
  },{
    path: 'chat',
    loadChildren: () => import('src/app/shared/pages/chat/chat.module').then(m => m.ChatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventPageRoutingModule {}
