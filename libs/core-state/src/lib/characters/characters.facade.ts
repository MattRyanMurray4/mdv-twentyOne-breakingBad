import { Injectable } from '@angular/core';
import { Character } from '@breakingbad/api-interfaces';
import { select, Store, Action } from '@ngrx/store';
import * as CharactersActions from './characters.actions';
import * as CharactersSelectors from './characters.selectors';

@Injectable()
export class CharactersFacade {
  loaded$ = this.store.pipe(select(CharactersSelectors.getCharactersLoaded));
  allCharacters$ = this.store.pipe(
    select(CharactersSelectors.getAllCharacters)
  );
  selectedCharacters$ = this.store.pipe(
    select(CharactersSelectors.getSelected)
  );

  constructor(private readonly store: Store) {}

  loadCharacters() {
    return this.store.dispatch(CharactersActions.loadCharacters());
  }

  loadCharacter(char_id: string){
    return this.store.dispatch(CharactersActions.loadCharacter({char_id}))
  }

  selectCharacter(characterId: string) {
    return this.store.dispatch(
      CharactersActions.selectCharacter({ characterId })
    );
  }

  createCharacter(character: Character) {
    return this.store.dispatch(
      CharactersActions.createCharacter({ character })
    );
  }

  updateCharacter(character: Character) {
    return this.store.dispatch(
      CharactersActions.updateCharacter({ character })
    );
  }

  deleteCharacter(character: Character) {
    return this.store.dispatch(
      CharactersActions.deleteCharacter({ character })
    );
  }

  init() {
    this.store.dispatch(CharactersActions.init());
  }

  private dispatch(action: Action) {
    return this.store.dispatch(action);
  }
}
