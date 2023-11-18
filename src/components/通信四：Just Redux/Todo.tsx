import TodoInput from './TodoInput'
import TodoList from './TodoList';
import ThemeContext from './ThemeContext'

import store from './store/index'

import { useState, useEffect } from 'react';

const Todo = () => {

  //# 这个 subscribe 订阅必须放在这里才能触发更新
  // 组件第一次渲染完毕后，让控制视图更新的办法加入到redux事件池中
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [random, setRandom] = useState(0);
  useEffect(() => {
      const unsubscribe = store.subscribe(() => {
          setRandom(Math.random());
      });
      return () => {
        unsubscribe() //在上一次组件释放的时候，把上一次放在事件池中的方法移除掉！
      }
  }, []);

  return (
    <ThemeContext.Provider value={{store}}>
      <div className='todo'>
        <div>Just Redux</div>
        <TodoInput />
        <TodoList />
      </div>  
    </ThemeContext.Provider>
  )
}

export default Todo