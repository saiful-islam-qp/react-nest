import {useState} from 'react'
import './App.css'
import {TodoListScreen} from './screens/TodoListScreen'

export const App: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <TodoListScreen />
    </>
  )
}
