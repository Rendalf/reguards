import { SimpleAction, PayloadAction, AsyncAction } from '../types/actions'
import { User } from '../types/user'
import { delay } from 'lodash'

export const USER_REQUESTED: 'USER_REQUESTED' = 'USER_REQUESTED'
type UserRequested = SimpleAction<typeof USER_REQUESTED>
export const userRequested = (): UserRequested => ({
  type: USER_REQUESTED,
})

export const USER_LOADED: 'USER_LOADED' = 'USER_LOADED'
type UserLoaded = PayloadAction<typeof USER_LOADED, User>
export const userLoaded = (user: User): UserLoaded => ({
  type: USER_LOADED,
  payload: user,
})

export const loadUser = (): AsyncAction =>
  (dispatch, getState) => {
    const userState = getState().user
    if (userState.user !== null || userState.isLoading) {
      return
    }

    dispatch(userRequested())
    // simulate real api
    delay(() => {
      const user: User = {
        id: '1',
        name: 'Rendalf',
        todoIds: ['1', '2', '3'],
      }
      dispatch(userLoaded(user))
    }, 1000)
  }

type UserAction =
  | UserRequested
  | UserLoaded

export default UserAction
