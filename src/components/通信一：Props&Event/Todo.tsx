import { useState } from 'react';
import TodoInput from './TodoInput'
import TodoList from './TodoList';

export interface StateProps {
  id: number;
  text: string;
  isFinished: boolean;
}

const Todo = () => {
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
    <div className='todo'>
      <div>Props & Event</div>
      <TodoInput addTodo={addTodo} />
      <TodoList todoList={todoList} changeTodo={changeTodo}/>
    </div>  
  )
}

export default Todo