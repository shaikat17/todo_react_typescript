import { useTodos } from "../store/store"


const Todos = () => {
    const {todos, toggleTodoCompleted, handleDeleteTodo} = useTodos()

    let filterData = todos

  return (
    <ul>
        {filterData.map(todo => {
            return <li key={todo.id}>
                <input type="checkbox" id={`todo-${todo.id}`} checked={todo.completed} onChange={() => toggleTodoCompleted(todo.id)} />
                <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
                {
                    todo.completed && (
                        <button type="button" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    )
                }
            </li>
        })}
    </ul>
  )
}

export default Todos