import axios from '../util/$axios'

//获取用户信息
export const getInfo = (token) =>{
  return axios.get('/user', {
    headers:{
      'Authorization': token
    }
  })
}

//登录
export const login = (values) => {
  console.log(values);
  
  return axios.post('/login', values)
}
