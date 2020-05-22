import { createStore,
  applyMiddleware,
  compose,
  combineReducers } from 'redux'
import reduxPromise from 'redux-promise'
import reduxThunk from 'redux-thunk'

import userList from '../reducer/userList'
import userInfo from '../reducer/userInfo'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reduer = combineReducers({
  userList,
  userInfo
})

export default createStore(reduer, {
  userList:[],
  userInfo:{}
}, composeEnhancers(applyMiddleware(reduxPromise, reduxThunk)))
