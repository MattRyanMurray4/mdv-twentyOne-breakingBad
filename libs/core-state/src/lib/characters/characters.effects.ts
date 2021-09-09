import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  actionTypeNamePastTense,
  actionTypeNamePresentTense,
  CharactersService,
  getActionType,
  NotifyService,
} from '@breakingbad/core-data';

import {
  loadCharacter,
  loadCharacterFailure,
  loadCharacterSuccess,
  loadCharacters,
  loadCharactersFailure,
  loadCharactersSuccess,
  createCharacter,
  createCharacterFailure,
  createCharacterSuccess,
  updateCharacter,
  updateCharacterFailure,
  updateCharacterSuccess,
  deleteCharacter,
  deleteCharacterFailure,
  deleteCharacterSuccess,
} from './characters.actions';

import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { of } from 'rxjs';
@Injectable()
export class CharactersEffects {
  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharacters),
      switchMap(() =>
        this.charactersService.all().pipe(
          map((characters) => loadCharactersSuccess({ characters })),
          catchError((error) => of(loadCharactersFailure({ error })))
        )
      )
    )
  );

  loadCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharacter),
      switchMap(({ char_id }) =>
        this.charactersService.find(char_id).pipe(
          map((character) => loadCharacterSuccess({ character })),
          catchError((error) => of(loadCharacterFailure({ error })))
        )
      )
    )
  );

  createCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCharacter),
      switchMap(({ character }) =>
        this.charactersService.create(character).pipe(
          map((character) => createCharacterSuccess({ character })),
          switchMap((error) => of(createCharacterFailure({ error })))
        )
      )
    )
  );

  updateCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCharacter),
      switchMap(({ character }) =>
        this.charactersService.update(character).pipe(
          map((character) => updateCharacterSuccess({ character })),
          switchMap((error) => of(updateCharacterFailure({ error })))
        )
      )
    )
  );

  deleteCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCharacter),
      switchMap(({ character }) =>
        this.charactersService.delete(character.char_id).pipe(
          map((char_id) => deleteCharacterSuccess({ char_id })),
          catchError((error) => of(deleteCharacterFailure({ error })))
        )
      )
    )
  );

  missionSuccessNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          updateCharacterSuccess,
          createCharacterSuccess,
          deleteCharacterSuccess
        ),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Character ${actionTypeNamePastTense[actionType]} Successfully!`
          );
        })
      ),
    { dispatch: false }
  );

  missionFailureNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          updateCharacterFailure,
          createCharacterFailure,
          deleteCharacterFailure
        ),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Failed to ${actionTypeNamePresentTense[actionType]} Character. Please try again.`
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private charactersService: CharactersService,
    private notify: NotifyService
  ) {}
}
