export default (state = {
  userInfo: {}
}, action ) =>{
  const  { type, payload } = action
  switch (type) {
    case 'get_userInfo':
      
      return {...state, ...payload}
    case 'del_userInfo':
      return {}
    default:
      return state
  }
}
