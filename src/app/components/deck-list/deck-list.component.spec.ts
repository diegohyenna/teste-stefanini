import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckListComponent } from './deck-list.component';
import { DeckService } from 'src/app/services/deck.service';
import { AlertService } from '../alert/alert.service';
import { Deck } from 'src/app/models/deck';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

class MockDeckService {
  private decks: Deck[] = [
    { id: '1', name: 'Deck 1', cards: [] },
    { id: '2', name: 'Deck 2', cards: [] },
  ];

  getDecks() {
    return this.decks;
  }

  removeDeck(deck: Deck) {
    this.decks = this.decks.filter((d) => d.id !== deck.id);
  }
}

class MockAlertService {
  setMessage(message: any) {}
}

describe('DeckListComponent', () => {
  let component: DeckListComponent;
  let fixture: ComponentFixture<DeckListComponent>;
  let deckService: MockDeckService;
  let alertService: MockAlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeckListComponent],
      providers: [
        { provide: DeckService, useClass: MockDeckService },
        { provide: AlertService, useClass: MockAlertService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    deckService = TestBed.inject(DeckService) as unknown as MockDeckService;
    alertService = TestBed.inject(AlertService) as unknown as MockAlertService;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getDecks on initialization', () => {
    spyOn(component, 'getDecks');
    component.ngOnInit();
    expect(component.getDecks).toHaveBeenCalled();
  });

  it('should get decks from DeckService on getDecks', () => {
    component.getDecks();
    expect(component.decks.length).toBe(2);
  });

  it('should remove deck from decks list and show success message on removeDeck', () => {
    const deckToRemove: Deck = { id: '1', name: 'Deck 1', cards: [] };
    spyOn(deckService, 'removeDeck').and.callThrough();
    spyOn(alertService, 'setMessage');
    component.removeDeck(deckToRemove);
    expect(deckService.removeDeck).toHaveBeenCalledWith(deckToRemove);
    expect(component.decks.length).toBe(1);
    expect(alertService.setMessage).toHaveBeenCalledWith({
      type: 'success',
      message: 'Deck excluido com sucesso!',
    });
  });
});
