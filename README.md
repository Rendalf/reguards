# Reguards
Type-safe data loaders for react-redux applications based on Typescript

Package is not ready yet

## TODOs:
1. Add proper peer-dependencies
1. Pass only needed flags into `Loadable` component instead of a whole state
1. Make `Loadable` a higher order component
1. Provide more extensive API to resolve cross-guards dependencies
1. Pass type-safe data into components (without null)
1. Provide version of `Loadable` that passes previous props between reloads
1. Create factory of types to provide betted dev-experience

## Example:
Here is how reguards should look like:
```typescript
// component
type UserPageProps = {
  user: User
  // We can't load todos and settings until we loaded user.
  // But we can load todos and settings in parallel.
  todos: Todo[]
  settings: Settings
}

class UserPageComponent extends React.Component<UserPageProps> {
  // ...
}

const guard = sequence(
  userGuard,
  parallel(todosGuard, settingsGuard),
)

const UserPage = connectGuard(guard, UserPageComponent, Preloader)

// guards
type PropsWithUser = {
  user: User
}
// this guard describes how to fetch data and add it to props
const userGuard: Guard<PropsWithUser> = {
  // return null when is not loaded
  getData: ({ user }) => {
    if (!user) {
      return null
    }

    return { user }
  },
  isLoading: (state) => state.isUserLoading,
  load: (dispatch) => {
    dispatch(fetchUser())
  },
}

type PropsWithTodos = {
  todos: Todo[]
}
const todosGuard: Guard<PropsWithTodos, PropsWithUser> = {
  getData: (state, { user }) => {
    const userTodos = state.usersTodos[user.id]
    if (!userTodos) {
      return null
    }

    return {
      todos: userTodos,
    }
  },
  isLoading: (state, { user }) => state.isUserTodosLoading[user.id],
  load: (dispatch, { user }) => {
    dispatch(fetchTodos(user.todoIds))
  },
}

type PropsWithSettings = {
  settings: Settings
}
const settingsGuard: Guard<PropsWithSettings, PropsWithUser> = {
  getData: ({ settings }) =>
    settings
      ? { settings }
      : null,
  isLoading: (state) => state.areSettingsLoading,
  load: (dispatch, { user }) => {
    dispatch(fetchSettings(user.id))
  },
}

```
