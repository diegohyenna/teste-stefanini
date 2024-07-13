import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';
import { DeckService } from 'src/app/services/deck.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  // styleUrls: ['./deck-form.component.css'],
})
export class DeckFormComponent implements OnInit {
  deckName = '';
  searchCard = '';
  allCards: Card[] = [];
  selectedCards: Card[] = [];
  loading = false;

  constructor(
    private pokemonService: PokemonService,
    private deckService: DeckService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getCards();
  }

  getCards() {
    this.pokemonService.getCards().subscribe((data) => {
      this.allCards = data;
      this.loading = false;
    });
  }

  addCard(event: MouseEvent, card: Card) {
    event.stopPropagation();
    const count = this.selectedCards.filter(
      (c: Card) => c.name === card.name
    ).length;
    if (count < 4 && this.selectedCards.length < 60) {
      this.selectedCards.push(card);
    }
  }

  removeCard(event: MouseEvent, index: number) {
    event.stopPropagation();
    this.selectedCards = this.selectedCards.filter(
      (c: any, i: number) => i !== index
    );
  }

  searchCards(pokemonName?: string) {
    this.loading = true;
    if (pokemonName)
      this.pokemonService.getCardByName(pokemonName).subscribe((data) => {
        this.allCards = data;
        this.loading = false;
      });

    this.getCards();
  }

  saveDeck() {
    if (this.selectedCards.length >= 24 && this.selectedCards.length <= 60) {
      if (!this.deckName) alert('O deck deve ter um nome!');
      const newDeck: Deck = {
        id: new Date().getTime().toString(),
        name: this.deckName,
        cards: this.selectedCards,
      };
      this.deckService.addDeck(newDeck);
      this.router.navigate(['/']);
      alert('Deck salvo com sucesso!');
    } else {
      alert('O baralho deve ter entre 24 e 60 cartas.');
    }
  }

  goBack() {
    this.location.back();
  }
}
