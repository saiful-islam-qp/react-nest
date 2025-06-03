import {useEffect, useState} from 'react'
import {API_BASE_URL} from '../../../constants/appConstants'
import type {ITodo} from '../../../types/ITodo'
import {useQuery, type UseQueryResult} from '@tanstack/react-query'

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

const useGetTodos = (): UseQueryResult<ITodo[], Error> => {
  return useQuery<ITodo[]>({
    queryKey: ['todos'],
    queryFn: fetchAllTodos,
  })
}

export const todoListScreenApi = {
  useGetTodos,
} as const
