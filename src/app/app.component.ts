import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GrilleComponent } from './grille/grille.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GrilleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'morpion';
}
