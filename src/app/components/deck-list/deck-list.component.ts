import { Component, OnInit } from '@angular/core';
import { Deck } from 'src/app/models/deck';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  // styleUrls: ['./deck-list.component.scss'],
})
export class DeckListComponent implements OnInit {
  decks: Deck[] = [];

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.deckService.getDecks().subscribe((data) => {
      this.decks = data;
    });
  }

  removeDeck(deck: Deck) {
    this.deckService.removeDeck(deck);
    this.decks = this.decks.filter((dc) => dc.id !== deck.id);
    alert('Deck excluido com sucesso!');
  }
}
