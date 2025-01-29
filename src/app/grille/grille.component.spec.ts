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

    component.changePlayer('X'); //on change de joueur, à O de jouer
    fixture.detectChanges();
    expect(infoElement.textContent.trim()).toBe('Au tour de O de jouer');
  });

  it('should update classesArray',()=>{
    component.currentPlayer = 'X';
    fixture.detectChanges();
    const caseElements = fixture.debugElement.queryAll(By.css('app-case'));
    const firstCaseButton = caseElements[0].query(By.css('button'));
    firstCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.casesArray[0]).toBe(1); //1 pour X, -1 pour O, 0 pour vide
    const sixthCaseButton = caseElements[5].query(By.css('button'));
    sixthCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.casesArray[5]).toBe(-1);
  });

  it('should end the game when a player wins',()=>{
    // Pattern testé : X gagne en diagonale
    component.currentPlayer = 'X';
    fixture.detectChanges();
    const caseElements = fixture.debugElement.queryAll(By.css('app-case'));
    const firstCaseButton = caseElements[0].query(By.css('button'));
    firstCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const secondCaseButton = caseElements[1].query(By.css('button'));
    secondCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const fifthCaseButton = caseElements[4].query(By.css('button'));
    fifthCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const sixthCaseButton = caseElements[5].query(By.css('button'));
    sixthCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const ninthCaseButton = caseElements[8].query(By.css('button'));
    ninthCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    // On vérifie que le jeu est terminé
    expect(component.isGameFinished).toBeTrue();
    // On vérifie que le message affiché est correct : X a gagné !
    const infoElement = fixture.nativeElement.querySelector('.info');
    expect(infoElement.textContent.trim()).toBe('X a gagné !');    
  });

  it('should end the game when there is a draw',()=>{
    // Pattern testé : match nul
    component.currentPlayer = 'X';
    fixture.detectChanges();
    const caseElements = fixture.debugElement.queryAll(By.css('app-case'));
    const firstCaseButton = caseElements[0].query(By.css('button'));
    firstCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const secondCaseButton = caseElements[1].query(By.css('button'));
    secondCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const thirdCaseButton = caseElements[2].query(By.css('button'));
    thirdCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const fourthCaseButton = caseElements[4].query(By.css('button'));
    fourthCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const fifthCaseButton = caseElements[3].query(By.css('button'));
    fifthCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const sixthCaseButton = caseElements[6].query(By.css('button'));
    sixthCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const seventhCaseButton = caseElements[5].query(By.css('button'));
    seventhCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const eighthCaseButton = caseElements[8].query(By.css('button'));
    eighthCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const ninthCaseButton = caseElements[7].query(By.css('button'));
    ninthCaseButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    // On vérifie que le jeu est terminé
    expect(component.isGameFinished).toBeTrue();
    // On vérifie que le message affiché est correct : Match nul !
    const infoElement = fixture.nativeElement.querySelector('.info');
    expect(infoElement.textContent.trim()).toBe('Match nul !');
  });

  it('should not allow to play after the game is finished',()=>{
    // Le jeu est terminé
    component.isGameFinished = true;
    fixture.detectChanges();
    // Récupérer toutes les cases
    const caseElements = fixture.debugElement.queryAll(By.css('app-case'));
    // On vérifie que le joueur ne peut pas jouer après la fin du jeu
    const firstCaseButtonAfterGame = caseElements[0].query(By.css('button'));
    firstCaseButtonAfterGame.triggerEventHandler('click', null);
    fixture.detectChanges();
    // On vérifie que la case n'a pas été cochée
    expect(component.casesArray[0]).toBe(0);
  });

  it('should render a button to restart the game asap the game is finished',()=>{
    const restartButton = fixture.nativeElement.querySelector('.restart');
    expect(restartButton).toBeTruthy();
  });
});
