import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeckListComponent } from './components/deck-list/deck-list.component';
import { DeckDetailComponent } from './components/deck-detail/deck-detail.component';
import { DeckFormComponent } from './components/deck-form/deck-form.component';
import { FormsModule } from '@angular/forms';
import { DeckService } from './services/deck.service';
import { PokemonService } from './services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    DeckListComponent,
    DeckDetailComponent,
    DeckFormComponent,
    LoadingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [PokemonService, DeckService],
  bootstrap: [AppComponent],
})
export class AppModule {}
