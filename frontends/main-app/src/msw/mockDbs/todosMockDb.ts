import type {ITodo} from '../../types/ITodo'

const todos: ITodo[] = [
  {id: 1, title: 'Todo 1', status: 'active'},
  {id: 2, title: 'Todo 2', status: 'completed'},
  {id: 3, title: 'Todo 3', status: 'active'},
]

export const todosMockDb = {
  getTodos: (): {
    id: number
    title: string
    status: 'active' | 'completed'
  }[] => {
    return [...todos]
  },
  getTodoById: (id: string): ITodo | null => {
    const todoId = Number(id)
    if (isNaN(todoId)) {
      throw new Error(`Invalid todoId: ${id}`)
    }
    const todo = todos.find(t => t.id === todoId)
    if (!todo) {
      throw new Error(`Todo with id ${todoId} not found`)
    }
    return {...todo}
  },
  createTodo: (title: string): ITodo => {
    if (!title || title.trim() === '') {
      throw new Error('Title is required')
    }

    const newTodo: ITodo = {
      id: todos.length + 1,
      title,
      status: 'active',
    }
    todos.push(newTodo)
    return {...newTodo}
  },
}
