export type TodoId = string
export type Todo = {
  id: TodoId
  body: string
  isCompleted: boolean
}

// Let's suppose user is allowed to only one set of todos, so we don't need parallel loading for it.
// So we can afford to have only one flag for all todos.
export type TodosState = {
  isLoading: boolean
  todos: Todo[] | null
}
