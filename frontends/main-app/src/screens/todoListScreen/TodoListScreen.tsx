import React from 'react'
import type {ITodo} from '../../types/ITodo'
import {API_BASE_URL} from '../../constants/appConstants'
import {todoListScreenApi} from './api/todoListScreenApi'
import {CreateTodo} from '../../features/createTodo/CreateTodo'

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
    <div>
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
              {todos.map((todo, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{todo.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
