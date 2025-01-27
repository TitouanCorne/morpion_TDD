// Importation de TestBed (outil d'Angular pour configurer et manipuler l'environnement de test)
// Importation de AppComponent pour pouvoir tester le composant
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  // Avant chaque test, cette fonction configure le module de test et prépare le composant
  beforeEach(async () => {
    // TestBed configure un environnement pour tester ton composant
    await TestBed.configureTestingModule({
      // On importe ici le composant à tester
      imports: [AppComponent],
    }).compileComponents();
  });

  // Test 1 : Vérifier que le composant est bien créé
  it('should create the app', () => {
    // Création du composant via TestBed. La fixture contient le composant testé et son état actuel.
    const fixture = TestBed.createComponent(AppComponent);

    // Accès à l'instance du composant (la logique du composant)
    const app = fixture.componentInstance;

    // Assertion : on vérifie que le composant a bien été créé, i.e. que l'instance n'est pas nulle
    expect(app).toBeTruthy();
  });

  // Test 2 : Vérifier que le titre est bien défini sur 'morpion'
  it(`should have the 'morpion' title`, () => {
    // Création du composant (comme précédemment)
    const fixture = TestBed.createComponent(AppComponent);

    // Accès à l'instance du composant
    const app = fixture.componentInstance;

    // Assertion : on vérifie que la propriété 'title' du composant est bien égale à 'morpion'
    expect(app.title).toEqual('morpion');
  });
});
