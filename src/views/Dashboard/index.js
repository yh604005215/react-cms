import React, { Component } from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import cookies from 'react-cookies'
import { getInfo } from '../../api/userApi'
import SideMenu from './SideMenu'
import TopHeader from './TopHeader'
import './index.css'

import Home from '../Home'
import MyCenter from '../MyCenter'

const { Content } = Layout
class Dashboard extends Component {
  componentDidMount() {
    if (cookies.load('token') && JSON.stringify(this.props.userInfo) === '{}') {
      this.props.getUserInfo()
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
