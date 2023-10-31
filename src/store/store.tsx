import { ReactNode, createContext, useContext, useState } from "react";

export type TodosProviderProps = {
    children: ReactNode
}

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    created: Date;
}

export type TodosContext = {
    todos: Todo[];
    handleAddTodo: (task:string) => void;
    toggleTodoCompleted: (id:string) => void;
}
export const todosContext = createContext<TodosContext | null>(null)

export const TodosProvider = ({ children }:TodosProviderProps) => {
    const [todos, setTodos] = useState<Todo[]>([])
    const handleAddTodo = (task:string) => {
        setTodos((prev) => {
            const newTodos:Todo[] = [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    created: new Date()
                },
                ...prev
            ]
            return newTodos
        })
    }

    const toggleTodoCompleted = (id:string) => {
        setTodos((prev) => {
            const newTodos = prev.map(todo => {
                if(todo.id === id) {
                    return {...todo, completed: !todo.completed}
                }
                return todo
            })
            return newTodos
        })
    }
    return <todosContext.Provider value={{todos, handleAddTodo, toggleTodoCompleted}}>
        {children}
    </todosContext.Provider>
}

export const useTodos = () => {
    const todosConsumer = useContext(todosContext)

    if(!todosConsumer) {
        throw new Error('UseTodos used outside of provider')
    }

    return todosConsumer
}