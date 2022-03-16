import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
//Importing capacitor packages
import { Browser } from '@capacitor/browser';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
//import auth service
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit, AfterViewInit, OnDestroy {
  result = null;
  scanActive = false;

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
      apiToken: ['',
      [Validators.required]]
    });
  }


  //------------------------------------ QR code scanner ------------------------------------
  ngAfterViewInit() {
    BarcodeScanner.prepare();
  }

  ngOnDestroy() {
    BarcodeScanner.stopScan();
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        resolve(true);
      } else if (status.denied) {
        const alert = await this.alertController.create({
          header: 'Permissions required',
          message: 'Please enable camera permission to use this feature.',
          buttons: [{
            text: 'cancel',
            role: 'cancel',
          },
          {
            text: 'Open Settings',
            handler: () => {
              resolve(false);
              BarcodeScanner.openAppSettings();
            }
          }]
        });
        await alert.present();
      } else {
        resolve(false);
      }
    });
  };


  async startScan() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground(); // make background of WebView transparent

      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      if (result.hasContent) {
        this.scanActive = false;
        //this.result = result.content;

        this.credentials.patchValue({
          apiToken: [result.content]
        });
      } else {
        alert('NO DATA FOUND!');
      }
    }

  };


  stopScan() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  //----------------------------------------------------------------
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authenticationService.login(this.credentials.value).subscribe(
      async (res) => {
        if (Object.keys(res).length === 0) {
          await loading.dismiss();
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
        }
      }, async (err) => {

        await loading.dismiss();

        const alert = await this.alertController.create({
          header: err.error.errors[0].title,
          message: err.error.errors[0].detail,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  get apiToken() {
    return this.credentials.get('apiToken');
  }

  async openauthorization() {
    await Browser.open({ url: 'https://developers.livestorm.co/docs/authorization' });
  }


}
