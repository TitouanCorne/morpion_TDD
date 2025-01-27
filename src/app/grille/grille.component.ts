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
  //cases: (null | 'X' | 'O')[] = Array(9).fill(null);

  get currentPlayer(): 'X' | 'O' {
    return this._currentPlayer;
  }
  set currentPlayer(player : 'X' | 'O'){
    this._currentPlayer = player;
    return;
  }

changePlayer(previousPlayer : 'X' | 'O'){
  if(previousPlayer === 'X'){
    this.currentPlayer = 'O';
  }else{
    this.currentPlayer = 'X';
  }
  console.log(`À ${this.currentPlayer} de jouer !`);
}
}
