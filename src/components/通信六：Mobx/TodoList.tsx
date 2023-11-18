import todoStore from "./store/todoStore";
import TodoItem from './TodoItem';
import { observer } from 'mobx-react-lite'

const style = {
  marginTop: '20px'
}

const TodoList = observer(() => {

  const todoListDom = todoStore.todoList.map(item => <TodoItem key={item.id} todo={item} />)

  return (
    <div className='todo-list' style={style}>
      { todoListDom }
    </div>  
  )
})

export default TodoList