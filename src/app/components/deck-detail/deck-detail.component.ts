import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
})
export class DeckDetailComponent implements OnInit {
  deck?: Deck;
  deckId: string | null = '';
  pokemonCount = 0;
  trainerCount = 0;
  types: string[] = [];

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private deckService: DeckService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.deckId = this.route.snapshot.paramMap.get('id');
    if (this.deckId) {
      this.getDeck(this.deckId);
    } else {
      this.router.navigate(['/']);
    }
  }

  getDeck(deckId: string | null) {
    if (deckId) {
      this.deck = this.deckService.getDeckById(deckId);
      this.countTypes(this.deck);
      this.types = this.eliminateDuplicates(this.types);
    }
  }

  countTypes(deck?: Deck) {
    if (!deck) return;
    deck.cards.forEach((card: Card) => {
      if (card.supertype == 'Pokémon') {
        this.pokemonCount++;
      } else if (card.supertype == 'Trainer') {
        this.trainerCount++;
      }

      if (card.types) this.types.push(...card.types);
    });
  }

  eliminateDuplicates(duplicates: string[]) {
    return [...new Set(duplicates)];
  }

  goBack() {
    this.location.back();
  }
}
