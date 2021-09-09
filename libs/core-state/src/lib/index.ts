import { ActionReducerMap } from '@ngrx/store';
import {
  charactersReducer,
  CharactersState,
  CHARACTERS_FEATURE_KEY,
} from './characters/characters.reducer';

export interface AppState {
  [CHARACTERS_FEATURE_KEY]: CharactersState;
}

export const reducers: ActionReducerMap<AppState> = {
  [CHARACTERS_FEATURE_KEY]: charactersReducer,
};
