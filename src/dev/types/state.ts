import { TodosState } from './todos'
import { UserState } from './user'
import Action from '../actions'

export type State = {
  user: UserState
  todos: TodosState
}

export type Reducer<TState> = (state: TState, action: Action) => TState

export type MapStateToProps<TStateProps> = (state: State) => TStateProps
// export type MapStateToProps<TStateProps, TOwnProps = {}> = (state: State, ownProps: TOwnProps) => TStateProps
