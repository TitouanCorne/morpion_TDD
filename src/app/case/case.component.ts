import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-case',
  standalone: true,
  imports: [],
  templateUrl: './case.component.html',
  styleUrl: './case.component.css'
})
export class CaseComponent {
  private _value: 'X' | 'O' | null = null; // Stockage interne de la valeur
  @Input() currentPlayer : 'X'|'O' = 'X'; // Valeur par défaut 'X'
   // Déclare l'EventEmitter pour émettre un événement vers le composant parent
  @Input() index: number = 0; // Index de la case, par défaut 0
  @Output() askToChangePlayer = new EventEmitter<'X' | 'O'>();
  @Output() askToUpdateCasesArray = new EventEmitter<number>();
  @Input() isGameFinished: boolean = false; // Par défaut, le jeu n'est pas terminé

  onClick(){
    if(!this.isGameFinished){
      if(this.value === null){
        this._value = this.currentPlayer;
        console.log("La case est maintenant cochée !")
        console.log("On change de joueur !")
        this.askToChangePlayer.emit(this.currentPlayer);
        this.askToUpdateCasesArray.emit(this.index);
      }
      else{
        console.log("Case déjà cochée !");
      }
    }
    else{
      console.log("Le jeu est terminé !");
    }
    return;
  };

  get value(): string | null {
    return this._value;
  }

  set value(val: string | null) {
    if (val === 'X' || val === 'O' || val === null) {
      this._value = val;
    } else {
      console.warn('Valeur invalide : ', val);
    }
  }

}
