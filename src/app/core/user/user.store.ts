import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { UserService } from './user.service';

export interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, userService = inject(UserService)) => {
    return {
      loadCurrentUser: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(() => userService.fetchCurrentUser()),
          tap((user) => patchState(store, { currentUser: user, isLoading: false })),
          catchError((err) => {
            patchState(store, {
              isLoading: false,
              error: err instanceof Error ? err.message : 'Failed to load user',
            });
            return of(null);
          }),
        ),
      ),
    };
  }),
);
