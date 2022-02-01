import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-popover-dialogue',
  template: `
    <ion-list>
      <ion-item [routerLink]="['/tabs/settings']" button (click)="close()">Settings</ion-item>
      <ion-item  detail="false" button (click)="goGit(); close()">GitHub Repo</ion-item>
      <ion-item  lines="none" detail="false" button (click)="logout(); close()">Logout</ion-item>
    </ion-list>
  `
})
export class PopoverDialogueComponent {

  constructor(
    public popover: PopoverController,
    private logoutComponent: LogoutComponent
  ) { }

  logout() {
    this.logoutComponent.logout();
  }

  goGit() {
    const url = 'https://github.com/Akilesh2112/Livestorm-control-app';
    window.open(url, '_blank');
  }

  close() {
    this.popover.dismiss();
  }

}
