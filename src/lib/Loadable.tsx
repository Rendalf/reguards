import * as React from 'react'
import { omit } from 'lodash'
import { Guard } from './guard'
import { connect } from 'react-redux'

type LoadableStateProps = {
  state: any
}

type LoadableDispatchProps = {
  dispatch: <TAction>(action: TAction) => void
}

type LoadableOwnProps<TOwnProps extends {}> = TOwnProps & {
  preloader: React.ComponentType
  component: React.ComponentType<TOwnProps>
  guard: Guard<TOwnProps>
}

type LoadableProps<TOwnProps extends {}> = LoadableStateProps & LoadableDispatchProps & LoadableOwnProps<TOwnProps>

type LoadablePropKey = keyof LoadableProps<{}>
const OMITTED_PROP_KEYS: Record<LoadablePropKey, true> = {
  dispatch: true,
  state: true,
  preloader: true,
  component: true,
  guard: true,
}
function getOwnProps <TOwnProps extends {}>(props: Readonly<LoadableProps<TOwnProps>>): TOwnProps {
  return omit(props, ...Object.keys(OMITTED_PROP_KEYS)) as TOwnProps
}

type LoadableState<TOwnProps> = {
  isLoaded: boolean
  isLoading: boolean
  ownProps: TOwnProps
}

class LoadableComponent<TOwnProps extends {}>
  extends React.Component<LoadableProps<TOwnProps>, LoadableState<TOwnProps>>
{
  constructor (props: LoadableProps<TOwnProps>, context: any) {
    super(props, context)

    const readonlyProps = Object.freeze(props)
    this.state = this.getNextState(readonlyProps)
  }

  componentDidMount () {
    this.checkGuard()
  }

  componentWillReceiveProps (nextProps: Readonly<LoadableProps<TOwnProps>>) {
    this.setState(
      this.getNextState(nextProps)
    )
  }

  componentDidUpdate () {
    this.checkGuard()
  }

  private getNextState (nextProps: Readonly<LoadableProps<TOwnProps>>): LoadableState<TOwnProps> {
    const { state, guard } = nextProps
    const ownProps = getOwnProps(nextProps)
    return {
      isLoaded: guard.isLoaded(state, ownProps),
      isLoading: guard.isLoading(state, ownProps),
      ownProps,
    }
  }

  private checkGuard () {
    const { isLoaded, isLoading, ownProps } = this.state
    if (!isLoaded && !isLoading) {
      const { guard, state, dispatch } = this.props
      guard.load(dispatch, state, ownProps)
    }
  }

  render () {
    const { isLoaded, ownProps } = this.state
    // TODO remove "as" when ts or react typings will become fixed
    const Preloader = this.props.preloader as React.ComponentClass
    const Component = this.props.component as React.ComponentClass<TOwnProps>

    if (isLoaded) {
      return (
        <Component { ...ownProps } />
      )
    }

    return (
      <Preloader />
    )
  }
}

const mapStateToProps = (state: any) => ({
  state,
})

// TODO make it HOC
const Loadable = connect<LoadableStateProps, {}, LoadableOwnProps<{}>>(mapStateToProps)(LoadableComponent)
export default Loadable
