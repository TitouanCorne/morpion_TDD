import { Component } from '@angular/core';
import { CaseComponent } from '../case/case.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grille',
  standalone: true,
  imports: [CommonModule, CaseComponent],
  templateUrl: './grille.component.html',
  styleUrl: './grille.component.css'
})
export class GrilleComponent {
  private _currentPlayer: 'X' | 'O' = 'X';
  isGameFinished: boolean = false;
  gameMessage: string = "Au tour de X de jouer"; //message affiché en fonction du joueur actuel, au début c'est X qui commence
  casesArray: (1 | -1 | 0)[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //1 for X, -1 for O, 0 for empty

  get currentPlayer(): 'X' | 'O' {
    return this._currentPlayer;
  };
  set currentPlayer(player : 'X' | 'O'){
    this._currentPlayer = player;
    return;
  };

  changePlayer(previousPlayer : 'X' | 'O'){
    if(previousPlayer === 'X'){
      this.currentPlayer = 'O';
      this.gameMessage = "Au tour de O de jouer"
    }else{
      this.currentPlayer = 'X';
      this.gameMessage = "Au tour de X de jouer"
    }
  };

  updateCasesArray(index : number){
    // On met à jour le tableau de cases
    if(!this.isGameFinished){
      if(this.currentPlayer === 'X'){ 
        this.casesArray[index] = -1; //attention à l'ordre des joueurs, on a déjà changé de joueur
      }
      else{
        this.casesArray[index] = 1;
      }
    }
    console.log(this.casesArray);
    this.checkWinner();
    this.checkDraw();
    return;
  };

  checkWinner(){
    const winningPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(let pattern of winningPatterns){
      const [a,b,c] = pattern;
      if(this.casesArray[a] + this.casesArray[b] + this.casesArray[c] === 3){
        console.log('X a gagné !');
        this.isGameFinished = true;
        console.log(this.isGameFinished);
        this.gameMessage = "X a gagné !";
        return;
      };
      if(this.casesArray[a] + this.casesArray[b] + this.casesArray[c] === -3){
        console.log('O a gagné !');
        this.isGameFinished = true;
        console.log(this.isGameFinished);
        this.gameMessage = "O a gagné !";
        return;
      };
    }
  };

  checkDraw(){
    // s'il n'y a plus de cases vides et que personne n'a gagné, c'est un match nul
    if(this.casesArray.every((element) => element !== 0) && !this.isGameFinished){
      this.isGameFinished = true;
      this.gameMessage = "Match nul !";
      return;
    }
  };

  restartGame(){
    // On remet tout à zéro en rechargeant la page
    window.location.reload();
    return;
  };
}
