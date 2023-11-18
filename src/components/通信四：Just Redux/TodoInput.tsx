import { useState, useContext } from 'react';
import ThemeContext from './ThemeContext'
import actions from './store/action'

const TodoInput = () => {
 
  const { store } = useContext(ThemeContext);
  const [ text, setText ] = useState('')

  const addTodoHandler = () => {
    store.dispatch(actions.todo.addAction({
      id: new Date().getTime(),
      text,
      isFinished: false
    }))
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