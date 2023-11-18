import { useState, useContext } from 'react';
import { MyContext } from './MyProvider';

const TodoInput = () => {

  const { dispatch } = useContext(MyContext)
  
  const [ text, setText ] = useState('')

  const addTodoHandler = () => {
    dispatch({
      type: 'ADD',
      todo: {
        id: new Date().getTime(),
        text,
        isFinished: false
      }
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