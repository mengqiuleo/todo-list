import { useContext } from 'react';
import TodoItem from './TodoItem';
import { MyContext } from './MyProvider';

const style = {
  marginTop: '20px'
}

const TodoList = () => {

  const { state } = useContext(MyContext)

  const todoListDom = state.map(item => <TodoItem key={item.id} todo={item} />)

  return (
    <div className='todo-list' style={style}>
      { todoListDom }
    </div>  
  )
}

export default TodoList