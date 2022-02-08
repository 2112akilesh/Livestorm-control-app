import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionsService } from '../../../core/services/sessions/sessions.service';

import { TabsPage } from '../../../tabs/tabs.page';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  data: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tabsPage: TabsPage
  ) { }

  ngOnInit() {
    const sessionId = this.route.snapshot.paramMap.get('session-id');

    this.tabsPage.setSelectedTab();
    //console.log(sessionId);
  }

  setSelectedTab() {
    this.tabsPage.setSelectedTab();
  }


}
