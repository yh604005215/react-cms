import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import cookies from 'react-cookies'
import { Layout, Menu, Dropdown, Avatar } from 'antd'
import { DownOutlined } from '@ant-design/icons'
const { Header } = Layout
class TopHeader extends Component {

  handleMenu=(obj)=>{
    if(obj.key === 'exit') {
      cookies.remove('token')
      this.props.history.push('/login')
    } else if(obj.key === 'My') {
      this.props.history.push('/my-center')
    }
  }



  render() {
    const menu = (
      <Menu onClick={this.handleMenu}>
        <Menu.Item key="My">
          个人中心
        </Menu.Item>
        <Menu.Item key="exit">
          退出
        </Menu.Item>
      </Menu>
    );
    return (
      <Header className="site-layout-sub-header-background">
        <div style={{float: 'right', color: '#fff'}}>
        <span  style={{marginRight: 10}}>欢迎{this.props.userInfo.userName}回来</span>
          <Dropdown overlay={menu}>
            <span className="ant-dropdown-link">
            <Avatar size={34} src={this.props.userInfo.avatar}/> <DownOutlined />
            </span>
          </Dropdown>
        </div>
      </Header>
    );
  }
}
const mapStateProps = (state) =>{
  return {
    userInfo:state.userInfo
  }
}
export default connect(mapStateProps)(withRouter(TopHeader));
