import { StateProps } from './Todo'
import { useState } from 'react';

interface IProps {
  addTodo: (todo: StateProps) => void
}

const TodoInput = (props: IProps) => {
  const { addTodo } = props
  const [ text, setText ] = useState('')

  const addTodoHandler = () => {
    addTodo({
      id: new Date().getTime(),
      text,
      isFinished: false
    })
    setText('')
  }

  return (
    <div className='todo-input'>
      <input 
        type="text" 
        placeholder='请输入待办事项' 
        onChange={(e) => setText(e.target.value)} 
        value={text} 
      />
      <button onClick={addTodoHandler}>添加</button>
    </div>  
  )
}

export default TodoInput