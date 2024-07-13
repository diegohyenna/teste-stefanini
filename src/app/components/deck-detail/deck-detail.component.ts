import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  // styleUrls: ['./deck-detail.component.css'],
})
export class DeckDetailComponent implements OnInit {
  deck: any;
  pokemonCount = 0;
  trainerCount = 0;
  types: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deckService: DeckService
  ) {}

  ngOnInit(): void {
    const deckId = this.route.snapshot.paramMap.get('id');
    // this.deck = this.deckService.getDecks().find((d: any) => d.id === deckId);
    if (deckId) {
      this.deckService.getDeckById(deckId).subscribe((data) => {
        this.deck = data;
        this.countTypes(this.deck);
        this.types = this.eliminateDuplicates(this.types);
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  countTypes(deck: any) {
    deck.cards.forEach((card: any) => {
      if (card.supertype === 'Pokémon') {
        this.pokemonCount++;
      } else if (card.supertype === 'Trainer') {
        this.trainerCount++;
      }
      this.types.push(...card.types);
    });
  }

  eliminateDuplicates(duplicates: any) {
    return [...new Set(duplicates)];
  }
}
