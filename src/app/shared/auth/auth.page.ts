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
    private authService: AuthenticationService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      organizationId: ['6e1f9bbc-d7f9-49da-8364-45feef4ab8ad', [Validators.required, Validators.minLength(27)]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials.value)
      .then( () => {
         this.router.navigateByUrl('/tabs', { replaceUrl: true }).then(() => {
           loading.dismiss();
          });
      });

  }

  get organizationId() {
    return this.credentials.get('organizationId');
  }

  async openauthorization(){
    await Browser.open({ url: 'https://developers.livestorm.co/docs/authorization' });
  }
  async openGetOrganization(){
    await Browser.open({ url: 'https://developers.livestorm.co/docs/authorization' });
  }

}
