import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideocamPage } from './videocam.page';

const routes: Routes = [
  {
    path: '',
    component: VideocamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideocamPageRoutingModule {}
