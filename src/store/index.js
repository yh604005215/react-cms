import { createStore,
  applyMiddleware,
  compose,
  combineReducers } from 'redux'
import reduxPromise from 'redux-promise'
import reduxThunk from 'redux-thunk'

import userInfo from '../reducer/userInfo'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reduer = combineReducers({
  userInfo
})

export default createStore(reduer, {
  userInfo:{}
}, composeEnhancers(applyMiddleware(reduxPromise, reduxThunk)))
