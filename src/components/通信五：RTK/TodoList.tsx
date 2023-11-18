import TodoItem from './TodoItem';
import { useSelector } from 'react-redux';

const style = {
  marginTop: '20px'
}

const TodoList = () => {

  const todos = useSelector(state => state.todo)

  const todoListDom = todos.map(item => <TodoItem key={item.id} todo={item} />)

  return (
    <div className='todo-list' style={style}>
      { todoListDom }
    </div>  
  )
}

export default TodoList