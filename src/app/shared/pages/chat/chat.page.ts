import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TabsPage } from '../../../tabs/tabs.page';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  data: any;
  organizationId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tabsPage: TabsPage,
    private platform: Platform,
    public navCtrl: NavController
  ) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.navCtrl.navigateBack('/tabs/sessions');
      this.tabsPage.setSelectedTab();
    });
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('session-id');

    this.tabsPage.setSelectedTab();
    //console.log(this.organizationId);
  }

  setSelectedTab() {
    this.tabsPage.setSelectedTab();
  }


  goToVideoCam() {
    this.navCtrl.navigateForward('/tabs/sessions/chat/' + this.organizationId + '/videocam');
  }


}
