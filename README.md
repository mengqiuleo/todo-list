通过 todo-list demo, 对比几种 react 组件间通信方式。



**同时使用 Redux Toolkit 和 React Redux，因为这是标准的 Redux 使用模式。**


# 对比

## just redux  和 Context
just redux  和 Context 差不多，都是自己声明一个 context，利用 `createContext()`, 然后利用高阶组件将 store 传入子组件
```html
// Context
<MyContext.Provider value={{
  todoList,
  addTodo,
  changeTodo
}}>
  {props.children}
  {/* react 中插槽的写法：直接使用 props.children */}
</MyContext.Provider> 


// just redux
<ThemeContext.Provider value={{store}}>
  <div className='todo'>
    <div>Just Redux</div>
    <TodoInput />
    <TodoList />
  </div>  
</ThemeContext.Provider>
```

然后子组件获取状态和触发更新:
- context: useContext 直接包含所有数据和更新方法
- just redux: useContext 获取 store, store.getState() 和 store.dispatch()


## react-redux
react-redux 相对于 redux : 使用 react-redux 的 provide API 传入数据，useDispatch 和 useSelector 更新和使用数据
```html
import { Provider } from 'react-redux'
<Provider store={store}>
  <div className='todo'>
    <div>Redux & React-Redux</div>
    <TodoInput />
    <TodoList />
  </div>  
</Provider>
```

子组件使用和更新
```js
import { useDispatch, useSelector } from 'react-redux';
const dispatch = useDispatch()
const state = useSelector((state) => state) //拿到数据
```


### react-redux 中的 hook 写法 和 connect 写法
我们推荐你在 React 组件中使用 React-Redux hooks API 作为默认方法。

现有的 connect API 仍然有效，并将继续得到支持，但 hooks API 更简单，与 TypeScript 配合得更好。


如今我们使用 React-Redux hooks API 作为我们的默认推荐。但是，connect API 仍然可以正常工作。

在这个 DEMO 中，我们使用 hook 的写法。 


### react-redux VS just redux
**关于订阅 subscribe**
一个组件如果想从store存取公用状态，需要进行四步操作：import引入store、getState获取状态、dispatch修改状态、subscribe订阅更新，代码相对冗余，我们想要合并一些重复的操作，而react-redux就提供了一种合并操作的方案：react-redux提供Provider和connect两个API，Provider将store放进this.context里，省去了import这一步，connect将getState、dispatch合并进了this.props，并自动订阅更新，简化了另外三步.



## RTK
react-redux 都基于 immutable ，不可变数据，我们需要最后返回的state重新赋一个地址值
```js
function handwrittenReducer(state, action) {
  return {
    ...state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
          ...state.first.second[action.someId],
          fourth: action.someValue
        }
      }
    }
  }
}
```
使用 RTK 可以变成
```js
function reducerWithImmer(state, action) {
  state.first.second[action.someId].fourth = action.someValue
}
```
**Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。**

RTK 在子组件中的数据使用和更新没有什么大的区别，都是直接使用 react-redux 的 hook
RTK 在声明 store 的地方有变化，
```js
import { createSlice } from '@reduxjs/toolkit' //声明reducer
```

**为什么使用 RTK?**
just 简单！！！
> 如你所见，Redux 涉及编写一些冗长的代码，例如不可变更新、action types 和 action creators，以及归一化 state。虽然这些模式有充分的存在理由，但是“手动”编写这些代码可能是比较困难的。此外，设置 Redux store 的过程需要几个步骤，我们必须提出自己的逻辑来处理诸如在 thunk 中 dispatch “loading” action 或处理归一化数据等事情。最后，很多时候用户不确定编写 Redux 逻辑的“正确方法”是什么。
> 这就是为什么 Redux 团队创建了 [Redux Toolkit：官方的、预设最佳实践的、功能齐备的工具集，用于高效的 Redux 开发](https://redux-toolkit.js.org/)。
> Redux Toolkit 包含了对于构建 Redux 应用程序至关重要的包和函数。它构建在我们建议的最佳实践中，简化了大多数 Redux 任务，避免了常见错误，使得编写 Redux 应用程序更容易了。
> 因此，Redux Toolkit 是编写 Redux 应用程序逻辑的标准方式。到目前为止，虽然你在本教程中“手写”的 Redux 逻辑是实际可行的代码，但是你不应该手动编写 Redux 逻辑——我们在本教程中介绍这些方法，是为了帮助你理解 Redux 是 如何 工作的。但是，对于实际应用程序，你应该使用 Redux Toolkit 来编写 Redux 逻辑。
> 当你使用 Redux Toolkit 时，到目前为止介绍的所有概念（actions、reducers、store setup、action creators、thunk 等）仍然存在，但是Redux Toolkit 提供了更简单的方法来编写代码。



# Mobx
> Mobx是一个独立的响应式的库，可以独立于任何UI框架存在，但是通常大家习惯把它和React进行绑定使用，用Mobx来做响应式数据建模，React作为UI视图框架渲染内容，我们环境的配置需要三个部分
> 1. 一个create-react-app创建好的React项目环境
> 2. mobx框架本身
> 3. 一个用来链接mobx和React的中间件
```js
# 创建项目
$ yarn create vite react-mobx --template react

# 安装mobx和中间件工具 mobx-react-lite  只能函数组件中使用
$ yarn add  mobx  mobx-react-lite
```

## 使用案例
### 1. 初始化mobx
初始化步骤
1. 定义数据状态state
2. 在构造器中实现数据响应式处理 makeAutoObservble
3. 定义修改数据的函数action
4. 实例化store并导出
```js
import { makeAutoObservable } from 'mobx'

class CounterStore {
  count = 0 // 定义数据
  constructor() {
    makeAutoObservable(this)  // 响应式处理
  }
  // 定义修改数据的方法
  addCount = () => {
    this.count++
  }
}

const counter = new CounterStore()
export default counter
```

### 2. React使用store
实现步骤
1. 在组件中导入counterStore实例对象
2. 在组件中使用storeStore实例对象中的数据
3. 通过事件调用修改数据的方法修改store中的数据
4. 让组件响应数据变化
```js
// 导入counterStore
import counterStore from './store'
// 导入observer方法
import { observer } from 'mobx-react-lite'
function App() {
  return (
    <div className="App">
      <button onClick={() => counterStore.addCount()}>
        {counterStore.count}
      </button>
    </div>
  )
}
// 包裹组件让视图响应数据变化
export default observer(App)
```

### 计算属性
```js
import { computed, makeAutoObservable } from 'mobx'

class CounterStore {
  list = [1, 2, 3, 4, 5, 6]
  constructor() {
    makeAutoObservable(this)
  }
  // 修改原数组
  changeList = () => {
    this.list.push(7, 8, 9)
  }
  // 定义计算属性
  get filterList () {
    return this.list.filter(item => item > 4)
  }
}

const counter = new CounterStore()

export default counter
```

### 异步数据处理
```js
// 异步的获取

import { makeAutoObservable } from 'mobx'
import axios from 'axios'

class ChannelStore {
  channelList = []
  constructor() {
    makeAutoObservable(this)
  }
  // 只要调用这个方法 就可以从后端拿到数据并且存入channelList
  setChannelList = async () => {
    const res = await axios.get('http://geek.itheima.net/v1_0/channels')
    this.channelList = res.data.data.channels
  }
}
const channlStore = new ChannelStore()
export default channlStore
```
使用
```js
import { useEffect } from 'react'
import { useStore } from './store'
import { observer } from 'mobx-react-lite'
function App() {
  const { channlStore } = useStore()
  // 1. 使用数据渲染组件
  // 2. 触发action函数发送异步请求
  useEffect(() => {
    channlStore.setChannelList()
  }, [])
  return (
    <ul>
      {channlStore.channelList.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
// 让组件可以响应数据的变化[也就是数据一变组件重新渲染]
export default observer(App)
```

### 模块化
```js
import { makeAutoObservable } from 'mobx'

class TaskStore {
  taskList = []
  constructor() {
    makeAutoObservable(this)
  }
  addTask () {
    this.taskList.push('vue', 'react')
  }
}

const task = new TaskStore()

export default task
```

```js
import { makeAutoObservable } from 'mobx'

class CounterStore {
  count = 0
  list = [1, 2, 3, 4, 5, 6]
  constructor() {
    makeAutoObservable(this)
  }
  addCount = () => {
    this.count++
  }
  changeList = () => {
    this.list.push(7, 8, 9)
  }
  get filterList () {
    return this.list.filter(item => item > 4)
  }
}

const counter = new CounterStore()

export default counter
```

**模块组合**
```js
import React from 'react'

import counter from './counterStore'
import task from './taskStore'


class RootStore {
  constructor() {
    this.counterStore = counter
    this.taskStore = task
  }
}


const rootStore = new RootStore()

// context机制的数据查找链  Provider如果找不到 就找createContext方法执行时传入的参数
const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)
// useStore() =>  rootStore  { counterStore, taskStore }

export { useStore }
```

使用
```js
import { observer } from 'mobx-react-lite'
// 导入方法
import { useStore } from './store'
function App() {
  // 得到store
  const store = useStore()
  return (
    <div className="App">
      <button onClick={() => store.counterStore.addCount()}>
        {store.counterStore.count}
      </button>
    </div>
  )
}
// 包裹组件让视图响应数据变化
export default observer(App)
```










