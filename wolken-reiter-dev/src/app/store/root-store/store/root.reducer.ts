import { createReducer, on } from '@ngrx/store'
import { changeHandset, saveVisitorId } from './root.actions'

export const ROOT_FEATURE_NAME = 'root'


export interface Appstate {
  isHandset: boolean,
  visitorId: string | null,
}

export const initialState: Appstate = {
  isHandset: false,
  visitorId: null
}

export const appStateReducer = createReducer(
  initialState,
  on(changeHandset, (state, { isHandset }) => ({
    ...state,
    isHandset
  })),
  on(saveVisitorId, (state, { id }) => ({
    ...state,
    visitorId: id
  })),
  )
