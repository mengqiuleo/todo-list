import { createSlice } from '@reduxjs/toolkit'

export interface StateProps {
  id: number;
  text: string;
  isFinished: boolean;
}

const initialState: StateProps[] = []

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, action) => { //state直接就是当前的 todo数组
      state.push(action.payload)
    },
    changeTodo: (state, action) => {
      const currentTodo = state.find(todoItem => todoItem.id === action.payload)
      if(currentTodo){
        currentTodo.isFinished = !currentTodo.isFinished
      }
    }
  }
})

export const { add, changeTodo } = todoSlice.actions

export default todoSlice.reducer