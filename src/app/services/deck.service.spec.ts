import { TestBed } from '@angular/core/testing';
import { DeckService } from './deck.service';
import { Deck } from '../models/deck';

describe('DeckService', () => {
  let service: DeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeckService],
    });

    service = TestBed.inject(DeckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array initially', () => {
    const decks = service.getDecks();
    expect(decks).toEqual([]);
  });

  it('should add a deck', () => {
    const newDeck: Deck = { id: '1', name: 'Test Deck', cards: [] };
    service.addDeck(newDeck);

    const decks = service.getDecks();
    expect(decks.length).toBe(1);
    expect(decks).toContain(newDeck);
  });

  it('should get a deck by id', () => {
    const newDeck: Deck = { id: '1', name: 'Test Deck', cards: [] };
    service.addDeck(newDeck);

    const deck = service.getDeckById('1');
    expect(deck).toEqual(newDeck);
  });

  it('should remove a deck', () => {
    const newDeck: Deck = { id: '1', name: 'Test Deck', cards: [] };
    service.addDeck(newDeck);

    service.removeDeck(newDeck);

    const decks = service.getDecks();
    expect(decks.length).toBe(0);
  });
});
