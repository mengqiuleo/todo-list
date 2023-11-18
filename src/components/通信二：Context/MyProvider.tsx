import { createContext, useState } from "react";

export interface StateProps {
  id: number;
  text: string;
  isFinished: boolean;
}

export interface ContextProps {
  todoList: StateProps[];
  changeTodo: (id: number) => void;
  addTodo: (todo: StateProps) => void;
}

// const MyContext = createContext<ContextProps | null>(null) 写法一
export const MyContext = createContext({} as ContextProps)

const MyProvider = (props: React.PropsWithChildren<object>) => {
  
  const [ todoList, setTodoList ] = useState<StateProps[]>([])

  const addTodo = (todo: StateProps) => {
    setTodoList([...todoList, todo])
  }

  const changeTodo = (id: number) => {
    const newTodoList = todoList.map(item => {
      if(item.id === id){
        return Object.assign({}, item, {
          isFinished: !item.isFinished
        })
      }
      return item
    })
    setTodoList(newTodoList)
  }



  return (
    <MyContext.Provider value={{
      todoList,
      addTodo,
      changeTodo
    }}>
      {props.children}
      {/* react 中插槽的写法：直接使用 props.children */}
    </MyContext.Provider>  
  )
}

export default MyProvider