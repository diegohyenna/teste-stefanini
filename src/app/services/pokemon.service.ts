import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiURL = 'https://api.pokemontcg.io/v2/cards';

  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http
      .get<any>(this.apiURL)
      .pipe(map((result: any) => result.data));
  }

  getCardByName(name: string): Observable<Card[]> {
    return this.http
      .get<Card[]>(`https://api.pokemontcg.io/v2/cards?q=name:${name}`)
      .pipe(map((result: any) => result.data));
  }
}
