import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TabsPage } from '../../../tabs/tabs.page';
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
    private tabsPage: TabsPage
  ) { }

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('session-id');

    this.tabsPage.setSelectedTab();
    //console.log(this.organizationId);
  }

  setSelectedTab() {
    this.tabsPage.setSelectedTab();
  }


}
