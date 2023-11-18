import { useContext } from 'react';
import { MyContext, StateProps } from './MyProvider';

const style = {
  marginTop: '5px',
  padding: '5px 0',
  boxShadow: '0 0 3px #eee'
}



interface IProps {
  todo: StateProps;
}

const TodoItem = ({ todo }: IProps) => {

  const { changeTodo } = useContext(MyContext)

  const spanStyle = {
    textDecoration: todo.isFinished ? 'line-through' : 'none'
  }

  const changeHandler = () => {
    changeTodo(todo.id)
  }

  return (
    <div className='todo-item' style={style}>
      <input type="checkbox" checked={todo.isFinished} onChange={changeHandler}/>
      <span style={spanStyle}>{todo.text}</span>
    </div>  
  )
}

export default TodoItem