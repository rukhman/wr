import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { concatMap, map, switchMap, take } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Product, UserData } from 'src/app/shared/types/types';
import * as authActions from './auth.actions';
import { getCartState, getFavoriteState } from './auth.selectors';

@Injectable()
export class AuthEffect {
  saveUserDataEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.saveToken),
      concatMap((jwtData) => {
        return this.auth.getUserData().pipe(
          map((userData: UserData) => {
            const decodedData = this.auth.decodeToken(
              jwtData.accessToken.accessToken
            );
            console.log(userData);
            console.log(decodedData);
            if (!userData?.role) {
              userData.role = decodedData.roles[0].role;
            }
            return authActions.saveUserData({ userData });
          })
        );
      })
    )
  );

  saveFaviriteState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.saveToken),
      concatMap((_) => {
        return this.api.getFavoriteState().pipe(
          map((products) => {
            return authActions.saveFavoriteState({ products });
          })
        );
      })
    )
  );

  saveCartState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.saveToken),
      concatMap((_) => {
        return this.api.getCartState().pipe(
          map((products) => {
            return authActions.saveCartState({ products });
          })
        );
      })
    )
  );

  deleteFromCartEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.changeCartState),
      switchMap((value: { product: Product }) => {
        return this.store.pipe(select(getCartState)).pipe(
          map((array) => array.map((item) => item.id)),
          map((ids) => {
            if (ids.includes(value.product.id)) {
              return authActions.plug();
            } else {
              return authActions.deleteFromSelectedCartState(value);
            }
          })
        );
      })
    )
  );

  sendNewCartStateEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.changeCartState),
        switchMap((value: { product: Product }) => {
          return this.store.pipe(select(getCartState)).pipe(
            take(1),
            map((array) => array.map((item) => item.id)),
            map((ids) => {
              if (ids.includes(value.product.id)) {
                this.api
                  .sendNewCartElement(<number>value.product.id)
                  .subscribe();
              } else {
                this.api
                  .deleteCartElement(<number>value.product.id)
                  .subscribe();
              }
            })
          );
        })
      ),
    { dispatch: false }
  );

  sendNewFavoriteStateEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.changeFavoriteState),
        switchMap((value: { product: Product }) => {
          return this.store.pipe(select(getFavoriteState)).pipe(
            take(1),
            map((array) => array.map((item) => item.id)),
            map((ids) => {
              if (ids.includes(value.product.id)) {
                this.api
                  .sendNewFavoriteElement(<number>value.product.id)
                  .subscribe();
              } else {
                this.api
                  .deleteFavoriteElement(<number>value.product.id)
                  .subscribe();
              }
            })
          );
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private api: ApiService,
    private store: Store
  ) {}
}
