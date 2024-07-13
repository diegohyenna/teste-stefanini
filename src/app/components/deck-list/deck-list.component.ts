import { Component, OnInit } from '@angular/core';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  // styleUrls: ['./deck-list.component.scss'],
})
export class DeckListComponent implements OnInit {
  decks: any = [];

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.deckService.getDecks().subscribe((data) => {
      this.decks = data;
    });
  }

  removeDeck(deck: any) {
    this.deckService.removeDeck(deck);
  }
}
