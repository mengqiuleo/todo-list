import { StateProps } from './store/reducer'
import { useContext } from 'react';
import actions from './store/action'
import ThemeContext from './ThemeContext'

const style = {
  marginTop: '5px',
  padding: '5px 0',
  boxShadow: '0 0 3px #eee'
}

interface IProps {
  todo: StateProps;
}

const TodoItem = ({ todo }: IProps) => {


  const spanStyle = {
    textDecoration: todo.isFinished ? 'line-through' : 'none'
  }

  const { store } = useContext(ThemeContext);

  const changeHandler = () => {
    store.dispatch(actions.todo.changeAction(todo.id))
  }

  return (
    <div className='todo-item' style={style}>
      <input type="checkbox" checked={todo.isFinished} onChange={changeHandler}/>
      <span style={spanStyle}>{todo.text}</span>
    </div>  
  )
}

export default TodoItem