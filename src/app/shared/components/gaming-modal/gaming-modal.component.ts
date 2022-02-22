import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSelect } from '@ionic/angular';

//Importing services
import { GamesService } from '../../../core/services/games/games.service';

import { TextareaToolsService } from 'src/app/core/services/textarea-toolbar/textarea-tools.service';

@Component({
  selector: 'app-gaming-modal',
  templateUrl: './gaming-modal.component.html',
  styleUrls: ['./gaming-modal.component.scss'],
})
export class GamingModalComponent implements OnInit {

  @ViewChild('gameList') selectRef: IonSelect;
  @Input() childMessage: string;

  showList = true;
  choices = null;

  constructor(
    private gamesService: GamesService,
    public textareaToolsService: TextareaToolsService
  ) {
  }

  ngOnInit() {
  }

  openSelect() {                   //Function to show the game selection menu
    this.selectRef.open();
  }

  startGame(startGame: string) {           //Function to choose the game
    console.log(startGame);

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
