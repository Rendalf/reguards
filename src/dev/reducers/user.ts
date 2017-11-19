import { Reducer } from '../types/state'
import { UserState } from '../types/user'
import { USER_REQUESTED, USER_LOADED } from '../actions/user'

const USER_DEFAULT_STATE: UserState = {
  isLoading: false,
  user: null,
}
const userReducer: Reducer<UserState> = (state = USER_DEFAULT_STATE, action) => {
  switch (action.type) {
    case USER_REQUESTED:
      return {
        ...state,
        isLoading: true,
      }

    case USER_LOADED:
      return {
        isLoading: false,
        user: action.payload,
      }

    default:
      return state
  }
}

export default userReducer
