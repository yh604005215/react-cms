import React from 'react'
import { Provider } from 'react-redux'
import RouterView from './router'
import store from './store/index'
import 'antd/dist/antd.css'
function App() {
  return <Provider store={store}>
    <RouterView />
  </Provider>
}

export default App
