import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';

//Importing Dialogue component
import {PopoverDialogueComponent} from './popover-dialogue.component';

@Component({
  selector: 'app-popover-controller',
  templateUrl: './popover-controller.component.html',
  styleUrls: ['./popover-controller.component.scss'],
})
export class PopoverControllerComponent implements OnInit {

  constructor(public popoverController: PopoverController) {}

  ngOnInit() {}

  async presentPopover(event: any) {
    const popover = await this.popoverController.create({
      component: PopoverDialogueComponent,
      cssClass: 'popover-dialogue',
      event,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
