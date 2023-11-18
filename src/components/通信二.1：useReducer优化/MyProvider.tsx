import { createContext, useReducer } from "react";
import reducer, { StateProps, ActionProps } from './store/reducer'


export interface ContextProps {
  state: StateProps[];
  dispatch: React.Dispatch<ActionProps>
}

// const MyContext = createContext<ContextProps | null>(null) 写法一
export const MyContext = createContext({} as ContextProps)

const MyProvider = (props: React.PropsWithChildren<object>) => {
  
  //* 一般来讲，复杂数据不适合 useState, 应该使用 useReducer
  
  const initState: StateProps[] = []

  const [ state, dispatch ] = useReducer(reducer, initState)


  return (
    <MyContext.Provider value={{
      state,
      dispatch
    }}>
      {props.children}
      {/* react 中插槽的写法：直接使用 props.children */}
    </MyContext.Provider>  
  )
}

export default MyProvider