import TodoItem from './TodoItem';
import { useSelector } from 'react-redux';
import { RootState } from './store/reducer'

const style = {
  marginTop: '20px'
}

const TodoList = () => {

  const state = useSelector((state: RootState) => state)

  const todoListDom = state.map(item => <TodoItem key={item.id} todo={item} />)

  return (
    <div className='todo-list' style={style}>
      { todoListDom }
    </div>  
  )
}

export default TodoList