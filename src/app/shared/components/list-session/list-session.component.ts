import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionsService } from '../../../core/services/sessions/sessions.service';


@Component({
  selector: 'app-list-session',
  templateUrl: './list-session.component.html',
  styleUrls: ['./list-session.component.scss'],
})
export class ListSessionComponent implements OnInit {

  listOfSession: any;

  constructor(
    public sessionsService: SessionsService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.sessionsService.listSessions().subscribe((noOfSession) => {
      this.listOfSession = noOfSession.data;
    });
  }

  navSession(sessionId) {
    this.router.navigate([`tabs/sessions/chat/${sessionId}`]);
  }
}
