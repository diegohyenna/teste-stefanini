import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Deck } from '../models/deck';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  url = 'http://localhost:3000/decks';
  private decksSubject = new BehaviorSubject<any[]>([]);
  decks$ = this.decksSubject.asObservable();

  private decks: Deck[] = [];

  constructor(private http: HttpClient) {}

  getDecks() {
    // return this.decks;
    return this.http.get<any>(`${this.url}`);
  }

  getDeckById(idDeck: string) {
    return this.http.get<any>(`${this.url}/${idDeck}`);
  }

  addDeck(deck: Deck) {
    this.decks.push(deck);
    this.http.post<any>(`${this.url}`, deck).subscribe();
    this.decksSubject.next(this.decks);
  }

  removeDeck(deck: Deck) {
    this.decks = this.decks.filter((d) => d !== deck);
    this.http.delete<any>(`${this.url}/${deck.id}`).subscribe();
    this.decksSubject.next(this.decks);
  }

  updateDeck(updatedDeck: Deck) {
    const index = this.decks.findIndex((d) => d.id === updatedDeck.id);
    if (index !== -1) {
      this.decks[index] = updatedDeck;
      this.decksSubject.next(this.decks);
    }
    this.http
      .put<any>(`${this.url}/${updatedDeck.id}`, updatedDeck)
      .subscribe();
  }
}
