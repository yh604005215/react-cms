import React, { Component } from 'react';
import { getUserList, update, userDelete } from '../../../api/userApi'
import { connect } from 'react-redux'
import cookies from 'react-cookies'
import { Table, Avatar, Switch, Button, Input } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import UserForm from './UserForm'
import style from  './index.module.css'
const { Search } = Input
class Users extends Component {
  
  state = {
    userList:[],
    visible: false,
    total: null,
    pageNum: 1,
    pageList: []
  }

  componentDidMount () {
    setTimeout(() => {
      this.getUserList()
    },0)
  }
  
  getUserList = (pageNum, value) =>{
    return getUserList(this.props.userInfo._id, pageNum, value).then(res => {
      this.setState({
        userList: res.data.list,
        total: res.data.total,
        pageList: [1]
      })
    })
  }

  pageOnChange = (pageNum) =>{
    const item = this.state.pageList.find(item => item === pageNum)
    if (item) {
      this.setState({
        pageNum
      })
      return
    }
    getUserList(this.props.userInfo._id, pageNum).then((res)=>{
      this.setState({
        userList: [...this.state.userList, ...res.data.list],
        total: res.data.total,
        pageNum,
        pageList: [...this.state.pageList, pageNum]
      })
    })
  }

  handelDel = (userId) => {
    userDelete(cookies.load('token'),userId).then(()=>{
      this.setState({
        userList: this.state.userList.filter(item => item._id !== userId),
        total: this.state.total - 1
      })
    })
    
  }

  columns = [
    {
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName',
      render: item => <span>{item}</span>
    },
    {
      title: '用户',
      key: 'userName',
      render: item => <div>
        <Avatar src={item.avatar} />
        <span style={{marginLeft: 10}}>{item.userName}</span>
      </div>
    },
    {
      title: '状态',
      key: 'roleState',
      render: item => <Switch
        defaultChecked={item.roleState}
        disabled={item.roleType > 2}
        onClick={() => {
          update(cookies.load('token'), {
            roleState: !item.roleState
          }, item._id).then(() => {
            const newList = this.state.userList.map(info => {
              if ( info._id === item._id ) {
                info.roleState = !info.roleState
                return info
              }
              return info
            })  
            this.setState({
              userList: newList
            })
          })   
        }}
      >
      </Switch>
    },
    {
      title: '操作',
      key: 'action',
      render: item => <div>
         <Button type="primary" shape="circle"
          icon={<EditOutlined />}
          disabled={item.roleType > 2}
         />

          <Button type="danger"shape="circle"
          icon={<DeleteOutlined />}
          disabled={item.roleType > 2}
          onClick={()=>this.handelDel(item._id)}
         />
      </div>
    }
  ]


  render() {
    return (
      <div>
        <div style={{marginBottom: 20}}>
          <Button type='primary' size='large' style={{marginRight: 10}}
          onClick={() => this.setState({visible: true})}>添加用户</Button>
          <Search
            style={{width: 300}}
            placeholder="请输入用户名"
            enterButton
            size="large"
            onSearch={value => {
              this.setState({
                pageNum: 1
              })
              this.getUserList(1,value)
            }}
          />
        </div>
         <Table
          className={style.table}
          columns={this.columns}
          dataSource={this.state.userList}
          rowKey={item => item._id}
          pagination={{
            pageSize: 5,
            total: this.state.total,
            current: this.state.pageNum,
            onChange: this.pageOnChange }}
          tableLayout="fixed"
          />
          <UserForm
          visible={this.state.visible}
          onCancel={()=>this.setState({visible:false})}
          getUserList={this.getUserList}/>
      </div>
    );
  }
}

const mapStateProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

export default connect(mapStateProps)(Users);
