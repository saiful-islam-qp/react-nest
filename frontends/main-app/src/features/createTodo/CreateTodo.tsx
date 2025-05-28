import {
  WuModal,
  WuModalHeader,
  WuModalContent,
  WuModalFooter,
  WuModalClose,
  WuButton,
} from '@npm-questionpro/wick-ui-lib'
import React from 'react'
import {API_BASE_URL} from '../../constants/appConstants'
import type {ITodo} from '../../types/ITodo'

export const CreateTodo: React.FC = () => {
  const [title, setTitle] = React.useState<string>('')
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [showError, setShowError] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [serverError, setServerError] = React.useState<unknown | null>(null)

  if (serverError) {
    throw serverError
  }

  const handleSave = async (): Promise<void> => {
    try {
      if (title.trim() === '') {
        setShowError(true)
        return
      } else {
        setShowError(false)
      }

      setIsLoading(true)
      const newTodo = await callCreateApi(title)
      setIsLoading(false)

      setIsOpen(false)
      setTitle('')
    } catch (error) {
      setServerError(error)
    }
  }

  const handleUpdateTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
    if (e.target.value.trim() !== '') {
      setShowError(false)
    }
  }

  if (serverError) {
    throw serverError
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Create Todo</button>
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
    </>
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
