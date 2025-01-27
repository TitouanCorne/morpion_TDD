import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseComponent } from './case.component';

describe('CaseComponent', () => {
  let component: CaseComponent;
  let fixture: ComponentFixture<CaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a box',() => {
    const boxElement = fixture.nativeElement.querySelector('.case');
    expect(boxElement).toBeTruthy(); //vérifie qu'un élément avec la class .case est présent
  });

  it('should trigger a click event',() => {
    spyOn(component,'onClick'); //espion de la méthode onClick (créer d'abord la méthode dans case.component.ts)
    const boxElement = fixture.nativeElement.querySelector('.case');
    boxElement.click(); //Simule le click
    expect(component.onClick).toHaveBeenCalled(); //Vérifie que la méthode `onClick` a été appelée
  });

  it('should accept only values : X or O or empty',()=>{
    component.value = 'X'; //on assigne une valeur valide
    expect(component.value).toBe('X'); // Vérifie que la valeur est bien "X"

    component.value = 'O';
    expect(component.value).toBe('O');

    component.value = null;
    expect(component.value).toBe(null);

    component.value = 'valeur invalide' as any; // Cas pour tester une valeur invalide
    expect(component.value).not.toBe('Valeur invalide');  // Vérifie que la valeur invalide n'a pas été acceptée
  });

  it('should change value when clicked (null --> X or null --> O)',()=>{
    const boxElement = fixture.nativeElement.querySelector('.case');

    component.value = null; //si on clique sur une case vide, on change sa valeur
    boxElement.click();
    expect(component.value).not.toBeNull();

    component.value = 'X'; //si on clique sur une case avec une croix, sa valeur doit rester la même
    boxElement.click();
    expect(component.value).toBe('X');

    component.value = 'O'; //si on clique sur une case avec un cercle, sa valeur doit rester la même
    boxElement.click();
    expect(component.value).toBe('O');
  });

  it('should display the correct value inside the box',()=>{
    const boxElement = fixture.nativeElement.querySelector('.case');

    component.value = 'X';
    fixture.detectChanges(); //pour que le html affiche bien la nouvelle valeur !
    expect(boxElement.textContent.trim()).toBe('X');

    component.value = 'O';
    fixture.detectChanges();
    expect(boxElement.textContent.trim()).toBe('O');

    component.value = null;
    fixture.detectChanges();
    expect(boxElement.textContent.trim()).toBe('');
  });
});
