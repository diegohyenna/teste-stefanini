import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Location } from '@angular/common';

import { DeckFormComponent } from './deck-form.component';
import { DeckService } from 'src/app/services/deck.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { AlertService } from '../alert/alert.service';
import { Deck } from 'src/app/models/deck';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

class MockPokemonService {
  getCards() {
    return of([]);
  }
  getCardByName(name: string) {
    return of([]);
  }
}

class MockDeckService {
  addDeck(deck: Deck) {}
}

class MockAlertService {
  setMessage(message: any) {}
}

class MockRouter {
  navigate(commands: any[]) {}
}

describe('DeckFormComponent', () => {
  let component: DeckFormComponent;
  let fixture: ComponentFixture<DeckFormComponent>;
  let pokemonService: MockPokemonService;
  let deckService: MockDeckService;
  let alertService: MockAlertService;
  let router: MockRouter;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeckFormComponent],
      providers: [
        { provide: PokemonService, useClass: MockPokemonService },
        { provide: DeckService, useClass: MockDeckService },
        { provide: AlertService, useClass: MockAlertService },
        { provide: Router, useClass: MockRouter },
        { provide: Location, useValue: { back: jasmine.createSpy('back') } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    pokemonService = TestBed.inject(
      PokemonService
    ) as unknown as MockPokemonService;
    deckService = TestBed.inject(DeckService) as unknown as MockDeckService;
    alertService = TestBed.inject(AlertService) as unknown as MockAlertService;
    router = TestBed.inject(Router) as unknown as MockRouter;
    location = TestBed.inject(Location);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading set to true and call getCards', fakeAsync(() => {
    spyOn(component, 'getCards').and.callThrough();
    component.ngOnInit();
    expect(component.loading).toBe(false);
    expect(component.getCards).toHaveBeenCalled();
  }));

  it('should get all cards on getCards', fakeAsync(() => {
    const cardsMock: any = [{ id: '1', name: 'Pikachu', supertype: 'Pokémon' }];
    spyOn(pokemonService, 'getCards').and.returnValue(of(cardsMock));
    component.getCards();
    tick();
    expect(component.allCards).toEqual(cardsMock);
    expect(component.loading).toBe(false);
  }));

  it('should add card to selectedCards if less than 4 of the same name and less than 60 total', () => {
    const card: any = { id: '1', name: 'Pikachu', supertype: 'Pokémon' };
    component.addCard(new MouseEvent('click'), card);
    expect(component.selectedCards).toContain(card);
  });

  it('should not add card to selectedCards if more than 4 of the same name or more than 60 total', () => {
    const card: any = { id: '1', name: 'Pikachu', supertype: 'Pokémon' };
    for (let i = 0; i < 4; i++) {
      component.selectedCards.push(card);
    }
    component.addCard(new MouseEvent('click'), card);
    expect(component.selectedCards.length).toBe(4);
  });

  it('should remove card from selectedCards', () => {
    const card: any = { id: '1', name: 'Pikachu', supertype: 'Pokémon' };
    component.selectedCards = [card];
    component.removeCard(new MouseEvent('click'), 0);
    expect(component.selectedCards).not.toContain(card);
  });

  it('should search cards by name', fakeAsync(() => {
    const cardsMock: any = [
      { id: '1', name: 'Charizard', supertype: 'Pokémon' },
    ];
    spyOn(pokemonService, 'getCardByName').and.returnValue(of(cardsMock));
    component.searchCards(new MouseEvent('click'), 'Charizard');
    tick();
    expect(component.allCards).toEqual(cardsMock);
    expect(component.loading).toBe(false);
  }));

  it('should call getCards if no name is provided in search', fakeAsync(() => {
    spyOn(component, 'getCards');
    component.searchCards(new MouseEvent('click'));
    tick();
    expect(component.getCards).toHaveBeenCalled();
  }));

  it('should save deck and navigate to root if conditions are met', () => {
    spyOn(deckService, 'addDeck');
    spyOn(router, 'navigate');
    spyOn(alertService, 'setMessage');
    component.selectedCards = Array(24).fill({
      id: '1',
      name: 'Pikachu',
      supertype: 'Pokémon',
    });
    component.deckName = 'My Deck';
    component.saveDeck();
    expect(deckService.addDeck).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(alertService.setMessage).toHaveBeenCalledWith({
      type: 'success',
      message: 'Deck salvo com sucesso!',
    });
  });

  it('should show warning if selectedCards length is not between 24 and 60', () => {
    spyOn(alertService, 'setMessage');
    component.selectedCards = Array(10).fill({
      id: '1',
      name: 'Pikachu',
      supertype: 'Pokémon',
    });
    component.saveDeck();
    expect(alertService.setMessage).toHaveBeenCalledWith({
      type: 'warning',
      message: 'O Deck deve ter no mínimo 24 cartas e no máximo 60!',
    });
  });

  it('should show danger message if deckName is empty', () => {
    spyOn(alertService, 'setMessage');
    component.selectedCards = Array(24).fill({
      id: '1',
      name: 'Pikachu',
      supertype: 'Pokémon',
    });
    component.saveDeck();
    expect(alertService.setMessage).toHaveBeenCalledWith({
      type: 'danger',
      message: 'Deve conter um nome para o baralho!',
    });
  });

  it('should call location.back when goBack is called', () => {
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});
