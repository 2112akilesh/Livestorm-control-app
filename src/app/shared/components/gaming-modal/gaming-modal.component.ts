import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';

//Importing services
import { GamesService } from '../../../core/services/games/games.service';

@Component({
  selector: 'app-gaming-modal',
  templateUrl: './gaming-modal.component.html',
  styleUrls: ['./gaming-modal.component.scss'],
})
export class GamingModalComponent implements OnInit {

  @ViewChild('gameList') selectRef: IonSelect;
  showList = true;

  constructor(private gamesService: GamesService) { }

  ngOnInit() { }

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
