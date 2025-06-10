import React from 'react'
import type {ITodo} from '../../types/ITodo'
import {todoListScreenApi} from './api/todoListScreenApi'
import {CreateTodo} from '../../features/createTodo/CreateTodo'
import {Link} from 'react-router'
import styles from './TodoListScreen.module.css'
import {TodoListItem} from './components/TodoListItem'

interface IProps {
  userId?: string
}

export const TodoListScreen: React.FC<IProps> = () => {
  const {data: todos, refetch, status, error} = todoListScreenApi.useGetTodos()
  const handleTodoCreated = (_todo: ITodo): void => {
    refetch()
  }

  if (status === 'pending') {
    return <div>Loading...</div>
  }
  if (status === 'error') {
    throw new Error(error?.message ?? 'An error occurred while fetching todos')
  }

  if (todos === null) throw new Error('Todos data is null')

  const isTodosEmpty = todos.length === 0

  return (
    <div className={styles.container}>
      {isTodosEmpty && <h1>Welcome to the Todo App</h1>}
      <CreateTodo onTodoCreated={handleTodoCreated} />

      {!isTodosEmpty && (
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {todos.map(todo => (
                <TodoListItem key={todo.id} todo={todo} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
