import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  menuItems = [
    {
      url: '/decks',
      name: 'Decks',
    },
    {
      url: '/deck/create',
      name: 'Criar deck',
    },
  ];
}
