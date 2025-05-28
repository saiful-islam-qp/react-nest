import {
  WuModal,
  WuModalHeader,
  WuModalContent,
  WuModalFooter,
  WuModalClose,
  WuButton,
} from '@npm-questionpro/wick-ui-lib'
import React from 'react'
import type {ITodo} from '../../types/ITodo'
import {API_BASE_URL} from '../../constants/appConstants'

interface IProps {
  userId?: string
}

export const TodoListScreen: React.FC<IProps> = () => {
  const [todos, setTodos] = React.useState<ITodo[]>([])
  // State to manage the title input and modal visibility
  const [title, setTitle] = React.useState<string>('')
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [showError, setShowError] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [serverError, setServerError] = React.useState<unknown | null>(null)

  return (
    <div>
      <h1>Welcome to the Todo App</h1>
      <button onClick={() => setIsOpen(true)}>Create Todo</button>

      <div>
        {todos.map((todo, index) => (
          <div key={index}>
            {index + 1} {todo.title}
          </div>
        ))}
      </div>
      <WuModal open={isOpen} onOpenChange={setIsOpen}>
        <WuModalHeader>Create Todo</WuModalHeader>
        <WuModalContent>
          <input
            type="text"
            title={title}
            onChange={handleUpdateTitle}
            placeholder="Title"
            aria-label="title"
            required
          />
          {showError && <p style={{color: 'red'}}>Please enter a title</p>}
        </WuModalContent>
        <WuModalFooter>
          <WuModalClose>Close</WuModalClose>
          <WuButton
            loading={isLoading}
            disabled={isLoading}
            onClick={handleSave}
          >
            Save
          </WuButton>
        </WuModalFooter>
      </WuModal>
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
