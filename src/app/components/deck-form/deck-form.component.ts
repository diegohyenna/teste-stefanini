import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'flowbite';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';
import { DeckService } from 'src/app/services/deck.service';
import { PokemonService } from 'src/app/services/pokemon.service';

import { AlertService } from '../alert/alert.service';

import type { ModalOptions, ModalInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
})
export class DeckFormComponent implements OnInit {
  deckName = '';
  searchCard = '';
  allCards: Card[] = [];
  selectedCards: Card[] = [];
  loading = false;

  $modalElement?: any;
  modal: any;
  instanceOptions: InstanceOptions = {
    id: 'modal-cards',
    override: true,
  };

  constructor(
    private pokemonService: PokemonService,
    private deckService: DeckService,
    private router: Router,
    private location: Location,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.$modalElement = document.querySelector('#modal-cards');
    this.modal = new Modal(this.$modalElement, {}, this.instanceOptions);
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

  searchCards(event: MouseEvent, pokemonName?: string) {
    event.stopPropagation();
    this.loading = true;
    if (pokemonName)
      this.pokemonService.getCardByName(pokemonName).subscribe((data) => {
        this.allCards = data;
        this.loading = false;
      });
    else this.getCards();
  }

  saveDeck() {
    this.modal.hide();
    if (this.selectedCards.length >= 24 && this.selectedCards.length <= 60) {
      if (!this.deckName) {
        this.alertService.setMessage({
          type: 'danger',
          message: 'Deve conter um nome para o baralho!',
        });
        return;
      }
      const newDeck: Deck = {
        id: new Date().getTime().toString(),
        name: this.deckName,
        cards: this.selectedCards,
      };
      this.deckService.addDeck(newDeck);
      this.router.navigate(['/']);
      this.alertService.setMessage({
        type: 'success',
        message: 'Deck salvo com sucesso!',
      });
    } else {
      this.alertService.setMessage({
        type: 'warning',
        message: 'O Deck deve ter no mínimo 24 cartas e no máximo 60!',
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
