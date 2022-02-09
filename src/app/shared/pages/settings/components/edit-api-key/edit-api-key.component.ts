import { Component, OnInit } from '@angular/core';

import { Storage } from '@capacitor/storage';

const API_TOKEN = 'my-api-token';

@Component({
  selector: 'app-edit-api-key',
  templateUrl: './edit-api-key.component.html',
  styleUrls: ['./edit-api-key.component.scss'],
})
export class EditApiKeyComponent implements OnInit {

  apiToken = '';

  constructor() { }

  ngOnInit() {
    this.loadToken();
  }

  async loadToken() {
    const apiToken = await Storage.get({ key: API_TOKEN });
    if (apiToken && apiToken.value) {
      this.apiToken = apiToken.value;
    }
  }

}
