import * as types from "./actionType";
import { StateProps } from './reducer';


const addAction = (todo: StateProps) => {
  return {
    type: types.ADD,
    todo
  }
}

const changeAction = (id: number) => {
  return {
    type: types.CHANGEFINISHED,
    id
  }
}

const todoAction = {
  addAction,
  changeAction
}

// 这里是模拟多个文件夹的情况
const actions = {
  todo: todoAction
}
export default actions