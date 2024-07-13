import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckListComponent } from './components/deck-list/deck-list.component';
import { DeckDetailComponent } from './components/deck-detail/deck-detail.component';
import { DeckFormComponent } from './components/deck-form/deck-form.component';

const routes: Routes = [
  { path: '', component: DeckListComponent },
  { path: 'deck/:id', component: DeckDetailComponent },
  { path: 'create', component: DeckFormComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
