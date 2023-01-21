import { createAction, props } from '@ngrx/store';

export enum RootActions {
  changeHandeset = "[root] change handeset mode",
  saveVisitorId = "[root] save visitor Id",
}

export const changeHandset = createAction(RootActions.changeHandeset, props<{isHandset: boolean}>());
export const saveVisitorId = createAction( RootActions.saveVisitorId, props<{ id: string  }>() )

