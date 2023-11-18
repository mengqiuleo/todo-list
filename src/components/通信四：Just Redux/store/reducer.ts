import * as types from "./actionType";
import { combineReducers } from 'redux'

export interface StateProps {
  id: number;
  text: string;
  isFinished: boolean;
}

export interface ActionProps {
  type: string;
  [key: string]: unknown;
}

const initState = []

const todoReducer = (state: StateProps[] = initState, action: ActionProps[]) => {
  switch(action.type){
    case types.ADD:
      return [...state, action.todo];
    case types.CHANGEFINISHED:
      return state.map(item => {
        if(item.id === action.id){
          return Object.assign({}, item, {
            isFinished: !item.isFinished
          })
        }
        return item;
      })
    default: 
      return state;
  }

}

// 这里是模拟多个文件夹的情况
const rootReducer = combineReducers({
  todo: todoReducer
})

export default rootReducer;