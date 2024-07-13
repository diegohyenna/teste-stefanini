import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  url = 'http://localhost:3000/decks';
  private decksSubject = new BehaviorSubject<any[]>([]);
  decks$ = this.decksSubject.asObservable();

  private decks: any = [];

  constructor(private http: HttpClient) {}

  getDecks() {
    // return this.decks;
    return this.http.get<any>(`${this.url}`);
  }

  getDeckById(idDeck: string) {
    return this.http.get<any>(`${this.url}/${idDeck}`);
  }

  addDeck(deck: any) {
    this.decks.push(deck);
    this.http.post<any>(`${this.url}`, deck).subscribe();
    this.decksSubject.next(this.decks);
  }

  removeDeck(deck: any) {
    this.decks = this.decks.filter((d: any) => d !== deck);
    this.http.delete<any>(`${this.url}`, deck.id).subscribe();
    this.decksSubject.next(this.decks);
  }

  updateDeck(updatedDeck: any) {
    const index = this.decks.findIndex((d: any) => d.id === updatedDeck.id);
    if (index !== -1) {
      this.decks[index] = updatedDeck;
      this.decksSubject.next(this.decks);
    }
  }
}
