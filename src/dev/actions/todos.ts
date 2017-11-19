import { PayloadAction, AsyncAction } from '../types/actions'
import { TodoId, Todo } from '../types/todos'
import { delay } from 'lodash'

export const TODOS_REQUESTED: 'TODOS_REQUESTED' = 'TODOS_REQUESTED'
type TodosRequested = PayloadAction<typeof TODOS_REQUESTED, TodoId[]>
export const todosRequested = (ids: TodoId[]): TodosRequested => ({
  type: TODOS_REQUESTED,
  payload: ids,
})

export const TODOS_LOADED: 'TODOS_LOADED' = 'TODOS_LOADED'
type TodosLoaded = PayloadAction<typeof TODOS_LOADED, Todo[]>
export const todosLoaded = (todos: Todo[]): TodosLoaded => ({
  type: TODOS_LOADED,
  payload: todos,
})

export const loadTodos = (ids: TodoId[]): AsyncAction =>
  (dispatch) => {
    dispatch(todosRequested(ids))
    // simulate real api
    delay(() => {
      const todos = ids.map((id, idx): Todo => ({
        id,
        body: `Todo #${ id }`,
        isCompleted: idx % 3 === 2,
      }))
      dispatch(todosLoaded(todos))
    }, 1000)
  }

type TodoAction =
  | TodosRequested
  | TodosLoaded

export default TodoAction
