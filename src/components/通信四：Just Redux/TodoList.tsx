import TodoItem from './TodoItem';
import ThemeContext from './ThemeContext'
import { useContext } from 'react';

const style = {
  marginTop: '20px'
}

const TodoList = () => {
  const { store } = useContext(ThemeContext);
  // const state = useSelector((state: RootState) => state)

  const { todo } = store.getState()

  const todoListDom = todo.map(item => <TodoItem key={item.id} todo={item} />)

  return (
    <div className='todo-list' style={style}>
      { todoListDom }
    </div>  
  )
}

export default TodoList