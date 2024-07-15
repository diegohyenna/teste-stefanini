import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { Card } from '../models/card';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cards successfully', () => {
    const dummyCards: any = [
      { id: '1', name: 'Pikachu' },
      { id: '2', name: 'Charizard' },
    ];

    service.getCards().subscribe((cards) => {
      expect(cards.length).toBe(2);
      expect(cards).toEqual(dummyCards);
    });

    const req = httpMock.expectOne('https://api.pokemontcg.io/v2/cards');
    expect(req.request.method).toBe('GET');
    req.flush({ data: dummyCards });
  });

  it('should fetch cards by name successfully', () => {
    const dummyCards: any = [{ id: '1', name: 'Pikachu' }];

    service.getCardByName('Pikachu').subscribe((cards) => {
      expect(cards.length).toBe(1);
      expect(cards).toEqual(dummyCards);
    });

    const req = httpMock.expectOne(
      'https://api.pokemontcg.io/v2/cards?q=name:Pikachu'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ data: dummyCards });
  });
});
