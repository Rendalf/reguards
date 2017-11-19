import { combineReducers } from 'redux'
import { State } from '../types/state'
import userReducer from './user'
import todosReducer from './todos'

const reducer = combineReducers<State>({
  user: userReducer,
  todos: todosReducer,
})

export default reducer
