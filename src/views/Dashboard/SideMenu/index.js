import React, { Component } from 'react';
import { Menu, Layout } from 'antd'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import menuArr from '../../../router/menuRouter'
const { Sider } = Layout
const { SubMenu } = Menu
class SideMenu extends Component {

  renderMenu = (menus) => {
    const {roleType} = this.props.userInfo
    return menus.map(item => {
      if (item.children &&  roleType >= item.permission) {
        return (
        <SubMenu key={item.path} icon={<item.icon />} title={item.title}>
          {this.renderMenu(item.children)}
        </SubMenu>
        )
      } else {
        if(item.permission > roleType){
          return null;
        }

        return (
        <Menu.Item key={item.path} icon={<item.icon />}>
          {item.title}
          </Menu.Item>
        )
      }
    })
  }

  handleChangePage = (obj) => {
    this.props.history.push(obj.key)
  }

  render() {
    const openPath = '/' + this.props.location.pathname.split('/')[1]
    
    return (
      <Sider>
        <Menu theme="dark" mode="inline" 
        selectedKeys={[this.props.location.pathname]}
        defaultOpenKeys={[openPath]}
        onClick ={this.handleChangePage}>
          { this.renderMenu(menuArr) } 
        </Menu>
      </Sider>
    );
  }
}

const mapStateProps = (state) =>{
  return {
    userInfo: state.userInfo
  }
}

export default connect(mapStateProps)(withRouter(SideMenu))
