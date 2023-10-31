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
    handleDeleteTodo: (id:string) => void;
}
export const todosContext = createContext<TodosContext | null>(null)

export const TodosProvider = ({ children }:TodosProviderProps) => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const newTodos = localStorage.getItem("todos") || "[]";
            return JSON.parse(newTodos) as Todo[]
        } catch (error) {
            return []
        }
    })
    
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
            localStorage.setItem("todos", JSON.stringify(newTodos))
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
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos
        })
    }

    const handleDeleteTodo = (id:string) => {
        setTodos(prev => {
            const newTodos = prev.filter(todo => todo.id !== id)
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos
        })
    }
    return <todosContext.Provider value={{todos, handleAddTodo, toggleTodoCompleted, handleDeleteTodo}}>
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