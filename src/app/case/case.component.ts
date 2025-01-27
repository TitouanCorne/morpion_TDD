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
   @Output() askToChangePlayer = new EventEmitter<'X' | 'O'>();
   
  onClick(){
    if(this.value === null){
      this._value = this.currentPlayer;
      console.log("La case est maintenant cochée !")
      console.log("On change de joueur !")
      this.askToChangePlayer.emit(this.currentPlayer);
    }
    else{
      console.log("Case déjà cochée !")
    }
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
