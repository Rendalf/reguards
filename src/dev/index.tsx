import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose, Store } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { State } from './types/state'
import reducer from './reducers'
import App from './components/App'

const composeEnhancers: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store: Store<State> = composeEnhancers(
  applyMiddleware(thunk)
)(createStore)(reducer)

const rootNode = document.getElementById('app-root')
if (rootNode) {
  ReactDOM.render(
    <Provider store={ store }>
      <App />
    </Provider>,
    rootNode,
  )
} else {
  throw new Error(`Couldn't find #app-root node`)
}
