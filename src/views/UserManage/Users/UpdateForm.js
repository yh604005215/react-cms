import React, { Component } from 'react';
import { Modal, Form, Input, Select, Checkbox } from 'antd'
import { update } from '../../../api/userApi'
import cookies from 'react-cookies'

const { Option } = Select

class UpdateForm extends Component {

  state = {
    isPassword: false
  }

  setValues = (values,userId) => {
    this.refs.form.setFieldsValue(values)
    this.userId = userId
  }

  render() {
    return (
      <Modal
        forceRender={true}
        visible={this.props.visible}
        title="修改用户"
        okText="确定"
        cancelText="取消"
        onCancel={this.props.onCancel}
        onOk={() => {
          this.refs.form
            .validateFields()
            .then((values) => {
              update(cookies.load('token'), values, this.userId)
              this.refs.form.resetFields()
              this.props.getUserList(this.userId, values)
              this.props.onCancel()
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })
        }}
      >
        <Form
          ref="form"
          name="form_in_modal"
          layout="horizontals"
          labelCol={{ span: 3, offset: 1 }}
        >
          <Form.Item
            name="userName"
            label="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input />
          </Form.Item>
          { this.state.isPassword && <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>}
          <Form.Item
            name="roleType"
            label="角色"
            rules={[
              {
                required: true,
                message: '请选择角色',
              }
            ]}
          >
            <Select showSearch placeholder="选择一个角色">
              <Option value={3}>超级管理员</Option>
              <Option value={2}>管理员</Option>
              <Option value={1}>小编</Option>
            </Select>
          </Form.Item>
        </Form>
        <Checkbox onChange={()=>this.setState({isPassword:!this.state.isPassword})}>
          是否修改密码
        </Checkbox>
      </Modal>
    );
  }
}

export default UpdateForm;
