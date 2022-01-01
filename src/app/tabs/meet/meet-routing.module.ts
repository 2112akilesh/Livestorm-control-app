import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetPage } from './meet.page';

const routes: Routes = [
  {
    path: '',
    component: MeetPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class Tab2PageRoutingModule {}
