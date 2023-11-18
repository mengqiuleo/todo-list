import TodoInput from './TodoInput'
import TodoList from './TodoList';

import { Provider } from 'react-redux'
import store from './store/index'

const Todo = () => {
 
  return (
    <Provider store={store}>
      <div className='todo'>
        <div>Redux & React-Redux</div>
        <TodoInput />
        <TodoList />
      </div>  
    </Provider>
  )
}

export default Todo