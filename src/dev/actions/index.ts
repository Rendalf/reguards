import TodoAction from './todos'
import UserAction from './user'

type Action =
  | TodoAction
  | UserAction

export default Action
