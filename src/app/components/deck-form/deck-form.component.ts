import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  allCards: any = [];
  selectedCards: any = [];
  loading = false;

  constructor(
    private pokemonService: PokemonService,
    private deckService: DeckService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.pokemonService.getCards().subscribe((data) => {
      this.allCards = data.data;
      this.loading = false;
    });
  }

  addCard(card: any) {
    const count = this.selectedCards.filter(
      (c: any) => c.name === card.name
    ).length;
    if (count < 4 && this.selectedCards.length < 60) {
      this.selectedCards.push(card);
    }
  }

  removeCard(index: number) {
    this.selectedCards = this.selectedCards.filter(
      (c: any, i: number) => i !== index
    );
  }

  searchCards(input: string) {
    this.loading = true;
    this.pokemonService.getCardByName(input).subscribe((data) => {
      this.allCards = data.data;
      this.loading = false;
    });
  }

  saveDeck() {
    if (this.selectedCards.length >= 24 && this.selectedCards.length <= 60) {
      if (!this.deckName) alert('O deck deve ter um nome!');
      const newDeck = {
        id: new Date().getTime().toString(),
        name: this.deckName,
        cards: this.selectedCards,
      };
      this.deckService.addDeck(newDeck);
      this.router.navigate(['/']);
    } else {
      alert('O baralho deve ter entre 24 e 60 cartas.');
    }
  }

  goBack() {
    this.location.back();
  }
}
