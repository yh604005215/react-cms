import axios from '../util/$axios'

//获取用户信息
export const getInfo = (token) => {
  return axios.get('/user', {
    headers: {
      Authorization: token,
    },
  })
}

//登录
export const login = (values) => {
  return axios.post('/login', values)
}

export const update = (token, data, userId) => {
  return axios.put(`user/${userId}`, data, {
    headers: { Authorization: token },
  })
}

export const getUserList  = (userId, pageNum, nickName)  => {
  return axios.get('userList',{
    params: {
      userId,
      nickName,
      pageNum
    }
  })
} 

//添加用户
export const register = (values) => {
  return axios.post('register',values)
}

//删除用户
export const userDelete = (token,userId) => {
  return axios.delete(`user/${userId}`,{
    headers:{
      Authorization:token
    }
  })
}
