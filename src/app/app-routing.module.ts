import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckListComponent } from './components/deck-list/deck-list.component';
import { DeckDetailComponent } from './components/deck-detail/deck-detail.component';
import { DeckFormComponent } from './components/deck-form/deck-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'decks',
    pathMatch: 'full',
  },
  { path: 'decks', component: DeckListComponent, pathMatch: 'full' },
  { path: 'deck/create', component: DeckFormComponent, pathMatch: 'full' },
  { path: 'deck/:id', component: DeckDetailComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
