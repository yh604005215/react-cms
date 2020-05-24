import React, { Component } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { register } from '../../../api/userApi'
const { Option } = Select
class UserForm extends Component {
  state = {
    visible: true,
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={this.props.onCancel}
        onOk={() => {
          this.refs.form
            .validateFields()
            .then((values) => {
              this.refs.form.resetFields()
              register(values).then(() => {
                this.props.getUserList()
                this.props.onCancel()
              })
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })
        }}
      >
        <Form
          ref="form"
          layout="vertical"
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
          <Form.Item
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
          </Form.Item>
          <Form.Item
            name="roleType"
            label="角色"
            rules={[
              {
                required: true,
                message: '请选择角色',
              },
            ]}
          >
            <Select showSearch placeholder="选择一个角色">
              <Option value={3}>超级管理员</Option>
              <Option value={2}>管理员</Option>
              <Option value={1}>小编</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default UserForm
