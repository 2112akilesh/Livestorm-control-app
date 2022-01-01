import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { IonSelect } from '@ionic/angular';

import { Storage } from '@capacitor/storage';

//Importing services
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { GamesService } from '../../core/services/games/games.service';

const TOKEN_KEY = 'my-token';
const API_TOKEN = 'my-api-token';

@Component({
  selector: 'app-tab2',
  templateUrl: 'meet.page.html',
  styleUrls: ['meet.page.scss']
})
export class MeetPage {

  @ViewChild('gameList') selectRef: IonSelect;
  showList = true;
  token = '';
  apiToken = '';

  public toggleTextBox = true;
  public toggleMicButton = true;
  public toggleCamButton = true;
  storageName = '';
  asdf: Promise<any>;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    public gamesService: GamesService,
  ) {
    this.loadToken();
  }


  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    const apiToken = await Storage.get({ key: API_TOKEN });
    if (token && token.value && apiToken && apiToken.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.apiToken = apiToken.value;
    }
  }

  //Toggling the buttons functions

  async enableEdit(ordId: any, apiToken: any) {
    this.toggleTextBox = !this.toggleTextBox;
  }

  disableEdit(active: boolean) {
    this.toggleTextBox = !this.toggleTextBox;
  }

  //const MyToken = Storage.get({ key: 'my-token' });

  // enableMic() {
  //   this.toggleMicButton = !this.toggleMicButton;
  // }
  // enableCam() {
  //   this.toggleCamButton = !this.toggleCamButton;
  // }

  //---------------Logout section-----------------
  async logout() {
    await this.authenticationService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  //---------------Gaming section-----------------
  openSelect() {                   //Function to show the game selection menu
    this.selectRef.open();
  }

  startGame(startGame: string) {           //Function to choose the game
    if (startGame === 'game-1') {
      const gameUrl = 'https://playpager.com/embed/checkers/index.html';
      this.gamesService.getGames(gameUrl);
    } else if (startGame === 'game-2') {
      const gameUrl = 'https://playpager.com/embed/chess/index.html';
      this.gamesService.getGames(gameUrl);
    } else {
      alert('Something is not Daijobu');
    }
  }


}

