export default (state = {
  userList:[]
}, action ) =>{
  const  { type, payload } = action
  switch (type) {
    case 'get_userList':
      
      return {...state, ...payload}
  
    default:
      return state
  }
}
