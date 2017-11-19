import { TodoId } from './todos'

export type UserId = string
export type User = {
  id: UserId
  name: string
  todoIds: TodoId[]
}

export type UserState = {
  isLoading: boolean
  user: User | null
}
