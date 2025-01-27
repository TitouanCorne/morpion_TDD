import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleComponent } from './grille.component';
import { By } from '@angular/platform-browser';

describe('GrilleComponent', () => {
  let component: GrilleComponent;
  let fixture: ComponentFixture<GrilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrilleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render 9 boxes',()=>{
    const boxElements = fixture.debugElement.queryAll(By.css('app-case')); //sélectionne tous les éléments app-case
    expect(boxElements.length).toBe(9); //on vérifie qu'il y en a bien neuf
  });

  it('should render 3 rows',()=>{
    const rowsElements = fixture.debugElement.queryAll(By.css('.row'));
    expect(rowsElements.length).toBe(3);
  });

  it('should accept currentPlayer = X or O',()=>{
    component.currentPlayer = 'X';
    expect(component.currentPlayer).toBe('X');

    component.currentPlayer = 'O';
    expect(component.currentPlayer).toBe('O');
  });

  it('should change player every time a new box is checked', () => {
    component.currentPlayer = 'X';  // Initialiser avec 'X'
    fixture.detectChanges(); 
  
    // Récupérer toutes les cases
    const caseElements = fixture.debugElement.queryAll(By.css('app-case'));
    
    //simuler un clic sur le bouton de la 1ere case
    const firstCaseButton = caseElements[0].query(By.css('button')); 
    firstCaseButton.triggerEventHandler('click', null); 
    fixture.detectChanges();
    expect(component.currentPlayer).toBe('O');  // Le joueur doit être 'O' après le clic
  
    //simuler un clic sur le bouton de la 2eme case
    const secondCaseButton = caseElements[1].query(By.css('button')); 
    secondCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.currentPlayer).toBe('X');  // Le joueur doit être 'X' après le clic
  });

  it('should write who is the current player',()=>{
    const infoElement = fixture.nativeElement.querySelector('.info');
    component.currentPlayer = 'X';
    fixture.detectChanges();
    expect(infoElement.textContent.trim()).toBe('Au tour de X de jouer');

    component.currentPlayer = 'O';
    fixture.detectChanges();
    expect(infoElement.textContent.trim()).toBe('Au tour de O de jouer');
  });
});
