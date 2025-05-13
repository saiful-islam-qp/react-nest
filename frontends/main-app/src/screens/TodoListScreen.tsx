interface IProps {
  userId?: string
}

export const TodoListScreen: React.FC<IProps> = () => {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        <li>Task 1</li>
        <li>Task 2</li>
        <li>Task 3</li>
      </ul>
    </div>
  )
}
