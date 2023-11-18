import { useContext } from 'react';
import { MyContext } from './MyProvider';
import { StateProps } from './store/reducer'

const style = {
  marginTop: '5px',
  padding: '5px 0',
  boxShadow: '0 0 3px #eee'
}

interface IProps {
  todo: StateProps;
}

const TodoItem = ({ todo }: IProps) => {

  const { dispatch } = useContext(MyContext)

  const spanStyle = {
    textDecoration: todo.isFinished ? 'line-through' : 'none'
  }

  const changeHandler = () => {
    dispatch({
      type: 'CHANGEFINISHED',
      id: todo.id
    })
  }

  return (
    <div className='todo-item' style={style}>
      <input type="checkbox" checked={todo.isFinished} onChange={changeHandler}/>
      <span style={spanStyle}>{todo.text}</span>
    </div>  
  )
}

export default TodoItem