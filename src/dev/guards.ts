import { Guard } from '../lib/guard'
import { State } from './types/state'
import { loadUser } from './actions/user'
import { loadTodos } from './actions/todos'

export const userGuard: Guard = {
  isLoaded: (state: State) => state.user.user !== null,
  isLoading: (state: State) => state.user.isLoading,
  load: (dispatch) => {
    dispatch(loadUser())
  },
}

export const todosGuard: Guard = {
  isLoaded: (state: State) => state.todos.todos !== null,
  isLoading: (state: State) => state.todos.isLoading,
  load: (dispatch, state: State) => {
    const { user } = state.user
    if (!user) {
      // TODO resolve the case by managing guards dependencies
      throw new Error(`Can't place "todosGuard" before "userGuard"`)
    }
    dispatch(loadTodos(user.todoIds))
  },
}
