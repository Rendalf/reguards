import { Reducer } from '../types/state'
import { TodosState } from '../types/todos'
import { TODOS_REQUESTED, TODOS_LOADED } from '../actions/todos'

const TODOS_DEFAULT_STATE: TodosState = {
  isLoading: false,
  todos: null,
}
const todosReducer: Reducer<TodosState> = (state = TODOS_DEFAULT_STATE, action) => {
  switch (action.type) {
    case TODOS_REQUESTED:
      return {
        ...state,
        isLoading: true,
      }

    case TODOS_LOADED:
      return {
        isLoading: false,
        todos: action.payload,
      }

    default:
      return state
  }
}

export default todosReducer
