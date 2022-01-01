import {Component} from '@angular/core';
import {PopoverController} from '@ionic/angular';


@Component({
  selector: 'app-popover-dialogue',
  template: `
    <ion-list>
      <ion-item [routerLink]="['/tabs/Profile/settingsPage']" button (click)="close()">Settings</ion-item>
      <ion-item  lines="none" detail="false" button (click)="goGit(); close()">GitHub Repo</ion-item>
    </ion-list>
  `
})
export class PopoverDialogueComponent {

  constructor(public popover: PopoverController) {}

  goGit() {
  const url = 'https://github.com/Akilesh2112/Livestorm-control-app';
  window.open(url, '_blank');
  }

  close(){
    this.popover.dismiss();
  }

}
