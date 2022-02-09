import { Component, ViewChild } from '@angular/core';

import { IonSelect } from '@ionic/angular';


@Component({
  selector: 'app-meet',
  templateUrl: 'events.page.html',
  styleUrls: ['events.page.scss']
})
export class EventsPage {

  public toggleTextBox = true;
  public toggleMicButton = true;
  public toggleCamButton = true;
  constructor() {
  }

  //const MyToken = Storage.get({ key: 'my-token' });

  // enableMic() {
  //   this.toggleMicButton = !this.toggleMicButton;
  // }
  // enableCam() {
  //   this.toggleCamButton = !this.toggleCamButton;
  // }

}

