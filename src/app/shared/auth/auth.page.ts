import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Browser } from '@capacitor/browser';


//import auth service
import { AuthenticationService } from '../../core/services/authentication/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      organizationId: ['', [Validators.required, Validators.minLength(30)]],
      apiToken: ['', [Validators.required, Validators.minLength(40)]]
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authenticationService.login(this.credentials.value)
      .then( () => {
         this.router.navigateByUrl('/tabs', { replaceUrl: true }).then(() => {
           loading.dismiss();
          });
      });

  }

  get organizationId() {
    return this.credentials.get('organizationId');
  }
  get apiToken() {
    return this.credentials.get('apiToken');
  }


  async openauthorization(){
    await Browser.open({ url: 'https://developers.livestorm.co/docs/authorization' });
  }
  async openGetOrganization(){
    await Browser.open({ url: 'https://developers.livestorm.co/reference/get_organization' });
  }

}
