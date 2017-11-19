import * as React from 'react'
import { connect } from 'react-redux'
import { User } from '../types/user'
import { Todo } from '../types/todos'
import { MapStateToProps } from '../types/state'
import { todosGuard, userGuard } from '../guards'
import Preloader from './Preloader'
import { createSequenceGuard } from '../../lib/guard'
import Loadable from '../../lib/Loadable'

type AppStateProps = {
  user: User
  todos: Todo[]
}

const AppComponent: React.StatelessComponent<AppStateProps> = (props) => {
  const { user, todos } = props

  return (
    <section>
      <h1>Hello, { user.name }!</h1>
      <ol>
        { todos.map(todo => (
          <li key={ todo.id } style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
            { todo.body }
          </li>
        )) }
      </ol>
    </section>
  )
}

const mapStateToProps: MapStateToProps<AppStateProps> = (state) => {
  const user = state.user.user
  const todos = state.todos.todos

  if (!user || !todos) {
    // TODO remove that when guards become type-safe
    throw new Error(`Can't render AppContainer when there is no user nor todos`)
  }

  return { user, todos }
}

const AppContainer = connect(mapStateToProps)(AppComponent)
const guard = createSequenceGuard(userGuard, todosGuard)

const App: React.StatelessComponent = () => (
  <Loadable
    preloader={ Preloader }
    component={ AppContainer }
    guard={ guard }
  />
)

export default App
