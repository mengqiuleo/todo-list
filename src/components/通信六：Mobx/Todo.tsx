import TodoInput from './TodoInput'
import TodoList from './TodoList';

const Todo = () => {
 
  return (
    <div className='todo'>
      <div>Mobx</div>
      <TodoInput />
      <TodoList />
    </div>  
  )
}

export default Todo