import { transition } from '@angular/animations';
import { Input } from '@angular/core';
import { Character } from '@breakingbad/api-interfaces';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CharactersActions from './characters.actions';

export interface CharactersAction extends Action {
  error: string;
}

export const CHARACTERS_FEATURE_KEY = 'characters';

export interface CharactersState extends EntityState<Character> {
  selectedId?: string | number; // which Characters record has been selected
  loaded: boolean; // has the Characters list been loaded
  error?: string | null; // last known error (if any)
}

export interface CharactersPartialState {
  readonly [CHARACTERS_FEATURE_KEY]: CharactersState;
}

export const charactersAdapter: EntityAdapter<Character> =
  createEntityAdapter<Character>({
    selectId: (character: Character) => character.char_id,
  });

export const initialState: CharactersState = charactersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const setLoading = (state: CharactersState) => ({
  ...state,
  loaded: false,
  error: null,
});

const setFailure = (state: CharactersState, { error }: CharactersAction) => ({
  ...state,
  error,
});

const _charactersReducer = createReducer(
  initialState,
  on(
    CharactersActions.loadCharacter,
    CharactersActions.loadCharacters,
    CharactersActions.createCharacter,
    CharactersActions.updateCharacter,
    CharactersActions.deleteCharacter,
    setLoading
  ),
  on(
    CharactersActions.loadCharacterFailure,
    CharactersActions.loadCharactersFailure,
    CharactersActions.createCharacterFailure,
    CharactersActions.updateCharacterFailure,
    CharactersActions.deleteCharacterFailure,
    setFailure
  ),
  on(CharactersActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CharactersActions.loadCharactersSuccess, (state, { characters }) =>
    charactersAdapter.setAll(characters, { ...state, loaded: true })
  ),
  on(CharactersActions.selectCharacter, (state, { characterId }) => ({
    ...state,
    selectedId: characterId,
  })),
  on(CharactersActions.loadCharacterSuccess, (state, { character }) =>
    charactersAdapter.upsertOne(character, { ...state, loaded: true })
  ),
  on(CharactersActions.createCharacterSuccess, (state, { character }) =>
    charactersAdapter.addOne(character, { ...state, loaded: true })
  ),
  on(
    CharactersActions.updateCharacterSuccess,
    (state, { character: { char_id, ...restCharacter } }) =>
      charactersAdapter.updateOne(
        { id: char_id, changes: { ...restCharacter } },
        { ...state, loaded: true }
      )
  ),
  on(CharactersActions.deleteCharacterSuccess, (state, { char_id }) =>
    charactersAdapter.removeOne(char_id, { ...state, loaded: true })
  )
);

export function charactersReducer(
  state: CharactersState | undefined,
  action: Action
) {
  return _charactersReducer(state, action);
}
