import { makeAutoObservable } from 'mobx'

export interface StateProps {
  id: number;
  text: string;
  isFinished: boolean;
}



class TodoStore {
  todoList: StateProps[] = [] // 定义数据
  constructor() {
    makeAutoObservable(this)  // 响应式处理
    // makeAutoObservable 这个API 可以直接转换，不用传第二个参数啥的，推荐这种
  }
  // 定义修改数据的方法
  add = (todoItem: StateProps) => {
    this.todoList.push(todoItem)
  }
  changeTodo = (id: number) => {
    const currentTodo = this.todoList.find(todoItem => todoItem.id === id)
    if(currentTodo){
      currentTodo.isFinished = !currentTodo.isFinished
    }
  }
}

const todoStore = new TodoStore()
export default todoStore