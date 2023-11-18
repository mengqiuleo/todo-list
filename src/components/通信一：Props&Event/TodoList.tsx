import TodoItem from './TodoItem';
import { StateProps } from './Todo'

const style = {
  marginTop: '20px'
}

interface IProps {
  todoList: StateProps[];
  changeTodo: (id:number) => void;
}

const TodoList = (props: IProps) => {
  const { todoList, changeTodo } = props

  const todoListDom = todoList.map(item => <TodoItem key={item.id} todo={item} changeTodo={changeTodo}/>)

  return (
    <div className='todo-list' style={style}>
      { todoListDom }
    </div>  
  )
}

export default TodoList