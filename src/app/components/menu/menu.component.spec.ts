import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct menu items', () => {
    expect(component.menuItems.length).toBe(2);
    expect(component.menuItems).toEqual([
      { url: '/decks', name: 'Decks' },
      { url: '/deck/create', name: 'Criar deck' },
    ]);
  });

  it('should render menu items', () => {
    fixture.detectChanges();
    const menuItemElements = fixture.debugElement.queryAll(By.css('li'));
    expect(menuItemElements.length).toBe(2);
    expect(menuItemElements[0].nativeElement.textContent).toContain('Decks');
    expect(menuItemElements[1].nativeElement.textContent).toContain(
      'Criar deck'
    );
  });

  it('should have correct URLs for menu items', () => {
    fixture.detectChanges();
    const anchorElements = fixture.debugElement.queryAll(By.css('ul li a'));

    expect(anchorElements.length).toBe(2);
    expect(anchorElements[0].nativeElement.getAttribute('href')).toBe('/decks');
    expect(anchorElements[1].nativeElement.getAttribute('href')).toBe(
      '/deck/create'
    );
  });
});
