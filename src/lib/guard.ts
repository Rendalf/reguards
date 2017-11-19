type State = any
type Dispatch = <TAction>(action: TAction) => void

// TODO create types factory considering State & Dispatch
export type Guard<TOwnProps extends {} = {}> = {
  isLoaded: (state: State, ownProps: TOwnProps) => boolean
  isLoading: (state: State, ownProps: TOwnProps) => boolean
  load: (dispatch: Dispatch, state: State, ownProps: TOwnProps) => void
}

export function createParallelGuard<O1 extends {}, O2 extends {}>
  (g1: Guard<O1>, g2: Guard<O2>): Guard<O1 & O2>
export function createParallelGuard<O1 extends {}, O2 extends {}, O3 extends {}>
  (g1: Guard<O1>, g2: Guard<O2>, g3: Guard<O3>): Guard<O1 & O2 & O3>
export function createParallelGuard<O1 extends {}, O2 extends {}, O3 extends {}, O4 extends {}>
  (g1: Guard<O1>, g2: Guard<O2>, g3: Guard<O3>, g4: Guard<O4>): Guard<O1 & O2 & O3 & O4>
export function createParallelGuard<O1 extends {}, O2 extends {}, O3 extends {}, O4 extends {}, O5 extends {}>
  (g1: Guard<O1>, g2: Guard<O2>, g3: Guard<O3>, g4: Guard<O4>, g5: Guard<O5>): Guard<O1 & O2 & O3 & O4 & O5>
export function createParallelGuard (...guards: Guard<{}>[]): Guard<{}> {
  return {
    isLoaded: (state, ownProps) =>
      guards.every(guard => guard.isLoaded(state, ownProps)),
    isLoading: (state, ownProps) =>
      guards.some(guard => guard.isLoading(state, ownProps)),
    load: (dispatch, state, ownProps) =>
      guards.forEach(guard => {
        if (!guard.isLoaded(state, ownProps) && !guard.isLoading(state, ownProps)) {
          guard.load(dispatch, state, ownProps)
        }
      }),
  }
}

export function createSequenceGuard<O1 extends {}, O2 extends {}>
  (g1: Guard<O1>, g2: Guard<O2>): Guard<O1 & O2>
export function createSequenceGuard<O1 extends {}, O2 extends {}, O3 extends {}>
  (g1: Guard<O1>, g2: Guard<O2>, g3: Guard<O3>): Guard<O1 & O2 & O3>
export function createSequenceGuard<O1 extends {}, O2 extends {}, O3 extends {}, O4 extends {}>
  (g1: Guard<O1>, g2: Guard<O2>, g3: Guard<O3>, g4: Guard<O4>): Guard<O1 & O2 & O3 & O4>
export function createSequenceGuard<O1 extends {}, O2 extends {}, O3 extends {}, O4 extends {}, O5 extends {}>
  (g1: Guard<O1>, g2: Guard<O2>, g3: Guard<O3>, g4: Guard<O4>, g5: Guard<O5>): Guard<O1 & O2 & O3 & O4 & O5>
export function createSequenceGuard (...guards: Guard<{}>[]): Guard<{}> {
  return {
    isLoaded: (state, ownProps) =>
      guards.every(guard => guard.isLoaded(state, ownProps)),
    isLoading: (state, ownProps) =>
      guards.some(guard => guard.isLoading(state, ownProps)),
    load: (dispatch, state, ownProps) => {
      const first = guards.find(guard => !guard.isLoaded(state, ownProps) && !guard.isLoading(state, ownProps))
      if (first) {
        first.load(dispatch, state, ownProps)
      }
    },
  }
}
