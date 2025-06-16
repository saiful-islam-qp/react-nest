import React from 'react'
import type {ITodo} from '../../types/ITodo'
import {todoListScreenApi} from './api/todoListScreenApi'
import {CreateTodo} from '../../features/createTodo/CreateTodo'
import styles from './TodoListScreen.module.css'
import {TodoListItem} from './components/TodoListItem'
import {WuButton} from '@npm-questionpro/wick-ui-lib'
import type {IPager} from '../../types/IPager'

interface IProps {
  userId?: string
}

export const TodoListScreen: React.FC<IProps> = () => {
  const [pager, setPager] = React.useState<IPager>({page: 1, pageSize: 10})
  const {data, refetch, status, error} = todoListScreenApi.useGetTodos(pager)
  const handleTodoCreated = (_todo: ITodo): void => {
    refetch()
  }
  const handleNextPage = (): void => {
    setPager(prevPager => ({
      ...prevPager,
      page: prevPager.page + 1,
    }))
  }

  const handlePreviousPage = (): void => {
    setPager(prevPager => ({
      ...prevPager,
      page: Math.max(prevPager.page - 1, 1), // Ensure page does not go below 1
    }))
  }

  if (status === 'pending') {
    return <div>Loading...</div>
  }
  if (status === 'error') {
    throw new Error(error?.message ?? 'An error occurred while fetching todos')
  }

  const todos = data?.data
  if (todos === null) throw new Error('Todos data is null')

  const isTodosEmpty = todos.length === 0

  const isFirstPage = pager.page === 1
  const lastPage = Math.ceil(data?.totalCount / pager.pageSize) || 1
  const isLastPage = pager.page >= lastPage

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        {isTodosEmpty && <h1>Welcome to the Todo App</h1>}
        <CreateTodo onTodoCreated={handleTodoCreated} />
        <div className={styles.pagination}>
          {!isFirstPage && (
            <WuButton onClick={handlePreviousPage} variant="secondary">
              Previous
            </WuButton>
          )}
          {!isLastPage && (
            <WuButton onClick={handleNextPage} variant="secondary">
              Next
            </WuButton>
          )}
        </div>
      </div>

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
