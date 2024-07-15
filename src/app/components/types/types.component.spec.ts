import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypesComponent } from './types.component';
import { NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';

describe('TypesComponent', () => {
  let component: TypesComponent;
  let fixture: ComponentFixture<TypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypesComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update type on changes', () => {
    const changes: SimpleChanges = {
      type: {
        currentValue: 'fire',
        previousValue: 'water',
        firstChange: false,
        isFirstChange: () => false,
      },
    };

    component.ngOnChanges(changes);
    expect(component.type).toBe('fire');
  });

  it('should handle initial input type', () => {
    component.type = 'grass';
    fixture.detectChanges();
    expect(component.type).toBe('grass');
  });

  it('should handle changes when input type is not provided', () => {
    const changes: SimpleChanges = {};
    component.ngOnChanges(changes);
    expect(component.type).toBeUndefined();
  });

  it('should handle changes when there is no previous value', () => {
    const changes: SimpleChanges = {
      type: {
        currentValue: 'fire',
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    };

    component.ngOnChanges(changes);
    expect(component.type).toBe('fire');
  });
});
