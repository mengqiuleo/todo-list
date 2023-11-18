import * as types from "./actionType";
import { StateProps } from './reducer';


export const addAction = (todo: StateProps) => ({
  type: types.ADD,
  todo
})

export const changeAction = (id: number) => ({
  type: types.CHANGEFINISHED,
  id
})