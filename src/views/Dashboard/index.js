import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import cookies from 'react-cookies'
import { getInfo } from '../../api/userApi'
import SideMenu from './SideMenu'
import TopHeader from './TopHeader'
import './index.css'
import { withRouter } from 'react-router'
import Home from '../Home'
import MyCenter from '../MyCenter'
import Users from '../UserManage/Users'
const { Content } = Layout
class Dashboard extends Component {
  componentDidMount() {
    if (cookies.load('token') && JSON.stringify(this.props.userInfo) === '{}') {
      this.props.getUserInfo().catch(() => this.props.history.push('/login'))
    }
  }

  render() {
    return (
      <Layout>
        <SideMenu />
        <Layout>
          <TopHeader />
            <Content
            style={{ 
              margin: '24px 16px 0',
              padding: '10px 10px 0 10px',
              background: '#fff',
              minHeight: 'auto'}}>
              <Switch>
                {/* 首页 */}
                <Route path="/home" component={ Home } />
                <Route path="/my-center" component={ MyCenter } />
                {this.props.userInfo.roleType > 1 &&<Route path="/user-manage/users" component={ Users } />}
              </Switch>
            </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  }
}

const mapDispatchToProps = {
  async getUserInfo() {
    const token = cookies.load('token')
    const res = await getInfo(token)

    return {
      type: 'get_userInfo',
      payload: res.data,
    }
  },
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard))
