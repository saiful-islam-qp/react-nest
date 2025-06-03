import {useEffect, useState} from 'react'
import {API_BASE_URL} from '../../../constants/appConstants'
import type {ITodo} from '../../../types/ITodo'

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

const useGetTodos = (): {
  status: 'idle' | 'in-progress' | 'error' | 'success'
  error: string | null
  data: ITodo[] | null
  refetch: () => void
} => {
  const [status, setStatus] = useState<
    'idle' | 'in-progress' | 'error' | 'success'
  >('idle')
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<ITodo[] | null>(null)

  useEffect(() => {
    if (status === 'idle') {
      setStatus('in-progress')

      fetchAllTodos()
        .then(data => {
          setData(data)
          setStatus('success')
        })
        .catch(error => {
          setStatus(error?.message ?? 'error')
          setError(error?.message ?? 'An error occurred while fetching todos')
          setData(null)
        })
    }
  }, [status])

  return {
    status,
    error,
    data,
    refetch: (): void => setStatus('idle'),
  }
}

export const todoListScreenApi = {
  useGetTodos,
} as const
