import TodoInput from './TodoInput'
import TodoList from './TodoList';

import MyProvider from './MyProvider'


const Todo = () => {
 
  return (
    <MyProvider>
      <div className='todo'>
        <div>useContext & useReducer</div>
        <TodoInput />
        <TodoList />
      </div>  
    </MyProvider>
  )
}

export default Todo