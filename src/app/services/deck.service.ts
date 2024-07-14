import { Injectable } from '@angular/core';

import { Deck } from '../models/deck';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private decks: Deck[] = [];

  constructor() {}

  getDecks() {
    return this.decks;
  }

  getDeckById(idDeck: string) {
    const deck = this.decks.find((d) => d.id === idDeck);
    return deck;
  }

  addDeck(deck: Deck) {
    this.decks.push(deck);
  }

  removeDeck(deck: Deck) {
    this.decks = this.decks.filter((d) => d !== deck);
  }

  updateDeck(updatedDeck: Deck) {
    const index = this.decks.findIndex((d) => d.id === updatedDeck.id);
    if (index !== -1) {
      this.decks[index] = updatedDeck;
    }
  }
}
