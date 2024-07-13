import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Deck } from 'src/app/models/deck';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.scss'],
})
export class DeckDetailComponent implements OnInit {
  deck?: Deck;
  pokemonCount = 0;
  trainerCount = 0;
  types: string[] = [];

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

  countTypes(deck?: Deck) {
    if (!deck) return;
    deck.cards.forEach((card: any) => {
      if (card.supertype === 'Pokémon') {
        this.pokemonCount++;
      } else if (card.supertype === 'Trainer') {
        this.trainerCount++;
      }
      this.types.push(...card.types);
    });
  }

  eliminateDuplicates(duplicates: string[]) {
    return [...new Set(duplicates)];
  }

  removeCard(event: MouseEvent, index: number) {
    event.stopPropagation();
    if (this.deck?.cards) {
      this.deck.cards = this.deck.cards.filter(
        (c: any, i: number) => i !== index
      );
      this.pokemonCount = 0;
      this.trainerCount = 0;
      this.types = [];
      this.countTypes(this.deck);
      this.types = this.eliminateDuplicates(this.types);
    }
  }

  saveDeck(deck?: Deck) {
    if (deck) {
      if (deck.cards.length < 24) {
        alert('Não pode salvar um deck com menos de 24 cartas!');
        return;
      }

      this.deckService.updateDeck(deck);
      alert('Deck salvo com sucesso!');
    }
  }
}
