import { Component, OnInit } from '@angular/core';

import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';

import { StorageService } from '../../../../../core/services/storage/storage.service';

const API_TOKEN = 'my-api-token';

@Component({
  selector: 'app-edit-api-key',
  templateUrl: './edit-api-key.component.html',
  styleUrls: ['./edit-api-key.component.scss'],
})
export class EditApiKeyComponent implements OnInit {

  apiTokenValue = '';

  constructor(
    private storageService: StorageService,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    this.loadToken();
  }

  async loadToken() {
    //const apiToken = await Storage.get({ key: API_TOKEN });
    const apiToken = await this.storageService.get(API_TOKEN);
    if (apiToken) {
      this.apiTokenValue = apiToken;
    }else{
      const alert = await this.alertController.create({
        header: 'Not Found',
        message: 'Please verify your API Token.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

}
