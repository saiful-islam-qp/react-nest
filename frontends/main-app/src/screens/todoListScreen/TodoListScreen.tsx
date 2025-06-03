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

  if (status === 'in-progress' || status === 'idle') {
    return <div>Loading...</div>
  }
  if (status === 'error') {
    throw new Error(error ?? 'An error occurred while fetching todos')
  }

  if (todos === null) throw new Error('Todos data is null')

  return (
    <div>
      <h1>Welcome to the Todo App</h1>
      <CreateTodo onTodoCreated={handleTodoCreated} />

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
    </div>
  )
}

const callCreateApi = async (title: string): Promise<ITodo> => {
  const newTodo = await fetch(`${API_BASE_URL}todos`, {
    method: 'POST',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({title}),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      return data.data as ITodo
    })

  return newTodo
}

const fetchAllTodos = async (): Promise<ITodo[]> => {
  const response = await fetch(`${API_BASE_URL}todos`, {
    method: 'GET',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }

  const data = await response.json()
  return data.data as ITodo[]
}
