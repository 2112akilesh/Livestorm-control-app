import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NavController, AlertController, LoadingController } from '@ionic/angular';


import { IonSelect } from '@ionic/angular';

import { Storage } from '@capacitor/storage';

//Importing services
import { AuthenticationService } from '../core/services/authentication/authentication.service';
import { GamesService } from '../core/services/games/games.service';

const TOKEN_KEY = 'my-token';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('gameList') selectRef: IonSelect;
  showList = true;

  public toggleTextBox = true;
  public toggleMicButton = true;
  public toggleCamButton = true;
  storageName = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    public gamesService: GamesService
    //public storage: Storage
  ) { }


  //Toggling the buttons functions
  async enableEdit(active: boolean) {
    this.toggleTextBox = !this.toggleTextBox;
  }
  disableEdit(active: boolean) {
    this.toggleTextBox = !this.toggleTextBox;
  }

  enableMic() {
    this.toggleMicButton = !this.toggleMicButton;
  }
  enableCam() {
    this.toggleCamButton = !this.toggleCamButton;
  }




  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  //---------------Gaming section-----------------
  openSelect() {                   //Function to show the game selection menu
    this.selectRef.open();
  }

  startGame(startGame) {           //Function to choose the game
    if (startGame === 'game-1') {
      const gameUrl = 'https://playpager.com/embed/checkers/index.html';
      this.gamesService.getGames(gameUrl);
    } else if (startGame === 'game-2') {
      const gameUrl = 'https://playpager.com/embed/chess/index.html';
      this.gamesService.getGames(gameUrl);
    } else {
      alert('baka ');
    }
  }


}

