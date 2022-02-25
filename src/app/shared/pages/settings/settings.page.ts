import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private router: Router,
    private platform: Platform,
    private navCtrl: NavController
  ) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      //this.navCtrl.navigateBack('/tabs/events');
      this.navCtrl.back();
    });
  }



  ngOnInit() {
  }

}
