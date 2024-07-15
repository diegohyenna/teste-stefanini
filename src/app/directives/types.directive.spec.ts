import { TypesDirective } from './types.directive';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TypesComponent } from '../components/types/types.component';

describe('TypesDirective', () => {
  let component: TypesComponent;
  let fixture: ComponentFixture<TypesComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypesDirective, TypesComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(TypesComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.query(By.directive(TypesDirective));
  });

  it('should create an instance', () => {
    const directive = new TypesDirective(el);
    expect(directive).toBeTruthy();
  });

  it('should add the correct class based on type input', () => {
    component.type = 'fire';
    fixture.detectChanges();
    expect(el.nativeElement.classList.contains('icon-fire')).toBeTrue();
  });

  it('should update the class when type input changes', () => {
    component.type = 'fire';
    fixture.detectChanges();
    expect(el.nativeElement.classList.contains('icon-fire')).toBeTrue();

    component.type = 'water';
    fixture.detectChanges();

    expect(el.nativeElement.classList.contains('icon-water')).toBeTrue();
    expect(el.nativeElement.classList.contains('icon-fire')).toBeFalse();
  });

  it('should handle unknown types gracefully', () => {
    component.type = 'unknown';
    fixture.detectChanges();
    expect(el.nativeElement.classList).toContain('icon-types');
    expect(el.nativeElement.classList.length).toBe(1);
  });
});
