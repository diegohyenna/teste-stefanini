import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { DeckDetailComponent } from './deck-detail.component';
import { DeckService } from 'src/app/services/deck.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class MockDeckService {
  getDeckById(id: string) {
    return { id, cards: [], name: 'Test' };
  }
}

describe('DeckDetailComponent', () => {
  let component: DeckDetailComponent;
  let fixture: ComponentFixture<DeckDetailComponent>;
  let deckService: MockDeckService;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeckDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
        { provide: DeckService, useClass: MockDeckService },
        { provide: Location, useValue: { back: jasmine.createSpy('back') } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckDetailComponent);
    component = fixture.componentInstance;
    deckService = TestBed.inject(DeckService) as unknown as MockDeckService;
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to root if deckId is null', () => {
    spyOn(component.route.snapshot.paramMap, 'get').and.returnValue(null);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call getDeck if deckId is provided', () => {
    spyOn(component, 'getDeck');
    component.ngOnInit();
    expect(component.getDeck).toHaveBeenCalledWith('1');
  });

  it('should get deck and call countTypes and eliminateDuplicates', () => {
    spyOn(component, 'countTypes');
    spyOn(component, 'eliminateDuplicates').and.callThrough();
    component.getDeck('1');
    expect(component.deck).toEqual({ id: '1', cards: [], name: 'Test' });
    expect(component.countTypes).toHaveBeenCalled();
    expect(component.eliminateDuplicates).toHaveBeenCalledWith([]);
  });

  it('should count types correctly', () => {
    const deck = {
      cards: [
        { supertype: 'Pokémon', types: ['Fire'] },
        { supertype: 'Trainer' },
      ],
    };
    component.countTypes(deck as any);
    expect(component.pokemonCount).toBe(1);
    expect(component.trainerCount).toBe(1);
    expect(component.types).toEqual(['Fire']);
  });

  it('should eliminate duplicates correctly', () => {
    const duplicates = ['Fire', 'Water', 'Fire'];
    const unique = component.eliminateDuplicates(duplicates);
    expect(unique).toEqual(['Fire', 'Water']);
  });

  it('should go back when goBack is called', () => {
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});
