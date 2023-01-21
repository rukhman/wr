import { createAction, props } from '@ngrx/store';
import { AccessTokenData, Product, UserData } from 'src/app/shared/types/types';

export enum AuthActions {
  plag = "[auth] plag",
  saveToken = "[auth] save tokens",
  removeToken = "[auth] remove tokens",
  saveUserData = "[auth] save user data",
  removeUserData = "[auth] remove user data",
  verifyEmail = "[auth] verify email",
  logout = "[auth] logout",
  changeFavoriteState = "[Products] save/delete product in favorite",
  changeCartState = "[Products] save/delete product in cart",
  addIntoCartState = "[Products] add product into cart",
  changeSelectedInCart = "[Products] save/delete selected product in cart",
  addIntoSelectedCartState = "[Products] add selected product in cart",
  deleteFromSelectedCartState = "[Products] delete selected product from cart",
  saveCartState = "[Products] save product array in cart",
  saveFavoriteState = "[Products] save product array in favorite",
}

export const plug = createAction( AuthActions.plag )
export const saveToken = createAction( AuthActions.saveToken, props<{ accessToken: AccessTokenData }>() )
export const removeToken = createAction( AuthActions.removeToken )
export const saveUserData = createAction( AuthActions.saveUserData, props<{ userData: UserData }>() )
export const removeUserData= createAction( AuthActions.removeUserData )
export const verifyEmail = createAction( AuthActions.verifyEmail, props<{ verified: boolean }>() )
export const logout= createAction( AuthActions.logout )
export const changeFavoriteState = createAction( AuthActions.changeFavoriteState, props<{ product: Product }>() )
export const changeCartState = createAction( AuthActions.changeCartState, props<{ product: Product }>() )
export const addIntoCartState = createAction( AuthActions.addIntoCartState, props<{ product: Product }>() )
export const changeSelectedStateInCart = createAction( AuthActions.changeSelectedInCart, props<{ product: Product }>() )
export const addIntoSelectedCartState = createAction( AuthActions.addIntoSelectedCartState, props<{ product: Product, reset?: boolean }>() )
export const deleteFromSelectedCartState = createAction( AuthActions.deleteFromSelectedCartState, props<{ product: Product }>() )
export const saveCartState = createAction( AuthActions.saveCartState, props<{ products: Array<Product> }>() )
export const saveFavoriteState = createAction( AuthActions.saveFavoriteState, props<{ products: Array<Product> }>() )


