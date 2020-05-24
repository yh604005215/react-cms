import axios from 'axios'
import { message } from 'antd'
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://106.52.239.202:4000' : 'http://localhost:5000',
  timeout: 5000
})

instance.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  return config
}, (error) => {
  // 对请求错误做些什么
  message.error('网络错误')
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  // 对响应数据做点什么
  if (response.data.code !== 0) {
    message.error(response.data.msg)
    return Promise.reject(response.data)
  }
  if(response.data.msg !== '成功') {
    message.success(response.data.msg)
  }
  return response.data
}, (error) => {
  // 对响应错误做点什么
  if ( error.response.status === 401 )  {
    message.error(error.response.data.msg) 
  }
  return Promise.reject(error)
})

export default instance
