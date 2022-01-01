import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public router: Router) { }
  // goBack() {
  //   this.router.navigate(['/Profile']).then(m => m.ProfilePage);
  // }
  ngOnInit() {
  }

}
