import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';

import {SessionsService} from '../../../core/services/sessions/sessions.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  data: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });
   }

  ngOnInit() {
    const sessionId = this.route.snapshot.paramMap.get('session-id');
    console.log(sessionId);
  }


}
