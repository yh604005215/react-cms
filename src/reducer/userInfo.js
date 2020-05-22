export default (state = {
  userInfo: {}
}, action ) =>{
  const  { type, payload } = action
  switch (type) {
    case 'get_userInfo':
      
      return payload
  
    default:
      return state
  }
}
