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
      apiToken: ['eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhcGkubGl2ZXN0b3JtLmNvIiwianRpIjoiOTMyMThjZmItYmNlZS00ZjI5LTg3ODktYTc0ZmQwNGI1N2E4IiwiaWF0IjoxNjMyNjM5ODY4LCJvcmciOiI2ZTFmOWJiYy1kN2Y5LTQ5ZGEtODM2NC00NWZlZWY0YWI4YWQifQ.G2faL36iCRFXcvznVZi2K26-HerLsMJ7HnnBAF3Lm_w', [Validators.required]]
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

    this.authenticationService.login(this.credentials.value)
      .then(() => {
        this.router.navigateByUrl('/tabs', { replaceUrl: true }).then(() => {
          loading.dismiss();
        });
      });

  }

  get apiToken() {
    return this.credentials.get('apiToken');
  }

  async openauthorization() {
    await Browser.open({ url: 'https://developers.livestorm.co/docs/authorization' });
  }


}
