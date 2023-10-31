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
            console.log(newTodos)
            return newTodos
        })
    }
    return <todosContext.Provider value={{todos, handleAddTodo}}>
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