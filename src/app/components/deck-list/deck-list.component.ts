import { Component, OnInit } from '@angular/core';
import { Deck } from 'src/app/models/deck';
import { DeckService } from 'src/app/services/deck.service';

import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
})
export class DeckListComponent implements OnInit {
  decks: Deck[] = [];

  constructor(
    private deckService: DeckService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getDecks();
  }

  getDecks() {
    this.decks = this.deckService.getDecks();
  }

  removeDeck(deck: Deck) {
    this.deckService.removeDeck(deck);
    this.getDecks();
    this.alertService.setMessage({
      type: 'success',
      message: 'Deck excluido com sucesso!',
    });
  }
}
