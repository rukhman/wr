import { createReducer, on } from '@ngrx/store';
import { AccessTokenData, Product, UserData } from 'src/app/shared/types/types';
import { addIntoCartState, addIntoSelectedCartState, changeCartState, changeFavoriteState, changeSelectedStateInCart, deleteFromSelectedCartState, logout, removeToken, removeUserData, saveCartState, saveFavoriteState, saveToken, saveUserData, verifyEmail } from './auth.actions';
export const AUTH_FEATURE_NAME = "auth"

export interface Auth {
  userData: null | UserData,
  accessToken: null | AccessTokenData,
  verified: boolean,
  role: "user",
  inCart: Array<Product>,
  inFavorite: Array<Product>,
  selectedInCart: Array<Product>,
}

const initialAuthState: Auth = {
  userData: null,
  accessToken: null,
  verified: false,
  role: "user",
  inCart: [],
  inFavorite: [],
  selectedInCart: [],
}

export const authReducer = createReducer(initialAuthState,
  on(saveToken, (state, { accessToken }) => ({
    ...state,
    accessToken
  })),
  on(removeToken, (state) => ({
    ...state,
    refreshToken: null
  })),
  on(saveUserData, (state, { userData }) => ({
    ...state,
    userData
  })),
  on(removeUserData, (state) => ({
    ...state,
    userData: null
  })),
  on(verifyEmail, (state, { verified }) => ({
    ...state,
    verified: verified
  })),
  on(logout, () => ({
    ...initialAuthState,
  })),
  on(changeFavoriteState, (state, { product }) => {
    const fav: any = Array.from(state.inFavorite)
    const favIds = fav.map((item: any) => item.id)
    const index = favIds.indexOf(product.id);
    index === -1 ?
    fav.push(product):
    fav.splice(index, 1);
    return {
      ...state,
      inFavorite: fav
    }
  }),
  on(changeCartState,(state, { product }) => {
    const cart = Array.from(state.inCart)
    const cartIds = cart.map(item => item.id)
    const index = cartIds.indexOf(product.id);
    index === -1 ?
    cart.push(product):
    cart.splice(index, 1);
    return {
      ...state,
      inCart: cart
    }
  }),
  on(addIntoCartState,(state, { product }) => {
    const cart = Array.from(state.inCart)
    const cartIds = cart.map(item => item.id)
    const index = cartIds.indexOf(product.id);
    if (index === -1) {
      cart.push(product);
    }
    return {
      ...state,
      inCart: cart
    }
  }),
  on(changeSelectedStateInCart,(state, { product }) => {
    const selectedInCart = Array.from(state.selectedInCart)
    const cartIds = selectedInCart.map(item => item.id)
    const index = cartIds.indexOf(product.id);
    index === -1 ?
    selectedInCart.push(product):
    selectedInCart.splice(index, 1);
    return {
      ...state,
      selectedInCart: selectedInCart
    }
  }),
  on(addIntoSelectedCartState,(state, { product, reset = false }) => {
    let selectedInCart = [];
    if (reset) {
      selectedInCart.push(product);
    } else {
      selectedInCart = Array.from(state.selectedInCart)
      const cartIds = selectedInCart.map(item => item.id)
      const index = cartIds.indexOf(product.id);
      if(index === -1) {
        selectedInCart.push(product);
      }
    }
    return {
      ...state,
      selectedInCart: selectedInCart
    }
  }),
  on(deleteFromSelectedCartState,(state, { product }) => {
    const selectedInCart = Array.from(state.selectedInCart)
    const cartIds = selectedInCart.map(item => item.id)
    const index = cartIds.indexOf(product.id);
    if(index !== -1) {
      selectedInCart.splice(index, 1)
    }
    return {
      ...state,
      selectedInCart: selectedInCart
    }
  }),
  on(saveCartState, (state, { products }) => {
    return {
      ...state,
      inCart: products
    }
  }),
  on(saveFavoriteState, (state, { products }) => {
    return {
      ...state,
      inFavorite: products
    }
  }),
)
