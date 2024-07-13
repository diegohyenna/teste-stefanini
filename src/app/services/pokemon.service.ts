import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiURL = 'https://api.pokemontcg.io/v2/cards';

  constructor(private http: HttpClient) {}

  getCards(): Observable<any> {
    return this.http.get<any>(this.apiURL);
  }

  getCardByName(name: string): Observable<any> {
    return this.http.get<any>(
      `https://api.pokemontcg.io/v2/cards?q=name:${name}`
    );
  }
}
