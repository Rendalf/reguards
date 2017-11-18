import * as React from 'react'
import { omit } from 'lodash'
import { Guard } from './guard'

type LoadableProps<TOwnProps extends {}> = TOwnProps & {
  dispatch: () => void
  state: any
  preloader: React.ComponentType
  component: React.ComponentType<TOwnProps>
  guard: Guard<TOwnProps>
}

type LoadablePropKey = keyof LoadableProps<{}>
const OMITTED_PROP_KEYS: Record<LoadablePropKey, true> = {
  dispatch: true,
  state: true,
  preloader: true,
  component: true,
  guard: true,
}
function getOwnProps <TOwnProps extends {}>(props: LoadableProps<TOwnProps>): TOwnProps {
  return omit(props, ...Object.keys(OMITTED_PROP_KEYS)) as TOwnProps
}

type LoadableState<TOwnProps> = {
  isLoaded: boolean
  isLoading: boolean
  ownProps: TOwnProps
}

class Loadable<TOwnProps extends {}>
  extends React.Component<LoadableProps<TOwnProps>, LoadableState<TOwnProps>>
{
  constructor (props: LoadableProps<TOwnProps>, context: any) {
    super(props, context)

    const { state, guard } = props
    const ownProps = getOwnProps(props)
    this.state = {
      isLoaded: guard.isLoaded(state, ownProps),
      isLoading: guard.isLoading(state, ownProps),
      ownProps,
    }
  }

  componentDidMount () {
    this.checkGuard()
  }

  componentDidUpdate () {
    this.checkGuard()
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

export default Loadable
