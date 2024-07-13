import { Card } from './card';

export interface Deck {
  id: string;
  name: string;
  cards: Card[];
}
