import React, { Component } from 'react'
import Particles from './Particles'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '../../api/userApi'
import { connect } from 'react-redux'
import cookies from 'react-cookies'
import style from './login.module.css'
class Login extends Component {

  componentDidMount() {
    this.props.delUserInfo()
  }
  

  onFinish = (values) => {
    console.log(this.timer);
    
    if (this.timer) {
      clearInterval(this.timer)
    }

    this.timer = setTimeout(()=>{
      login(values).then(res => {
        cookies.save('token', res.token,[{expires: '3h'}])
        this.props.history.push(`/home`)
      })
    },500)  
  }

  render() {
    return (
      <div style={{ background: 'rgb(35,39,65)' }}>
        <Particles />
        <div className={style.container}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="userName"
              rules={[{ required: true, message: '用户名不能为空' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '密码不能为空' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  delUserInfo () {
    return {
      type: 'del_userInfo'
    }
  }
}
export default connect(null,mapDispatchToProps)(Login)
