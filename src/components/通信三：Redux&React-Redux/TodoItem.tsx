import { StateProps } from './store/reducer'
import { useDispatch } from 'react-redux';
import { changeAction } from './store/action'

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

  const dispatch = useDispatch()

  const changeHandler = () => {
    dispatch(changeAction(todo.id))
  }

  return (
    <div className='todo-item' style={style}>
      <input type="checkbox" checked={todo.isFinished} onChange={changeHandler}/>
      <span style={spanStyle}>{todo.text}</span>
    </div>  
  )
}

export default TodoItem