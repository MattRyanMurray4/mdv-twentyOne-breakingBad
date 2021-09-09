import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CharactersComponent } from './characters/characters.component';
import { CharactersListComponent } from './characters/characters-list/characters-list.component';
import { CharacterDetailsComponent } from './characters/character-details/character-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreStateModule } from '@breakingbad/core-state';
import { CoreDataModule } from '@breakingbad/core-data';
import { UiLibraryModule } from '@breakingbad/ui-library';
import { RoutingModule } from './routing.module';
import { MaterialModule } from '@breakingbad/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { CharacterComponent } from './character/character.component';
import { CharacterInfoComponent } from './character/character-info/character-info.component';

// const reducers: ActionReducerMap<IState> = { todos, visibilityFilter };

// export function localStorageSyncReducer(
//   reducer: ActionReducer<any>
// ): ActionReducer<any> {
//   return localStorageSync({ keys: ['todos'] })(reducer);
// }

// const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharactersListComponent,
    CharacterDetailsComponent,
    CharacterComponent,
    CharacterInfoComponent,
  ],
  imports: [
    BrowserModule,
    // StoreModule.forRoot(reducers, { metaReducers }),
    HttpClientModule,
    BrowserAnimationsModule,
    CoreStateModule,
    CoreDataModule,
    UiLibraryModule,
    RoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
