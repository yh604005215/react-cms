export default (state = {
  userList:[]
}, action ) =>{
  const  { type, payload } = action
  switch (type) {
    case 'get_userList':
      
      return payload
  
    default:
      return state
  }
}
