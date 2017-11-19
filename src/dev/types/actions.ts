import { ThunkAction } from 'redux-thunk'
import { State } from './state'

export type SimpleAction<TActionType extends string> = {
  type: TActionType
}

export type PayloadAction<TActionType extends string, TPayload> = {
  type: TActionType
  payload: TPayload
}

export type AsyncAction = ThunkAction<void, State, void>
