import React, { Component } from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import Particles from 'react-particles-js'
import style from './index.module.css'
import Avatar from  './Avatar'
const { Header, Content } = Layout
class MyCenter extends Component {
  render() {
    return (
      <Layout style={{ background: '#fff' }}>
        <Header style={{ height: 100 }}>
          <Particles className={style.particles} />
          <div style={{ margin: 18, overflow: 'hidden' }}>
            <div className={style.avatar}>
              <Avatar avatar={this.props.userInfo.avatar}
              id={this.props.userInfo._id}
              updateAvatar={this.props.editInfo}/>
            </div>
            <h2
              style={{
                float: 'left',
                marginLeft: 20,
                color: '#fff',
                fontSize: 30,
              }}
            >
              {this.props.userInfo.userName}
            </h2>
          </div>
        </Header>
        <Content></Content>
      </Layout>
    )
  }
}

const mapStateProps = (state) => {
  return {
    userInfo: state.userInfo,
  }
}

const mapDispatchProps = {
  editInfo (payload) {
    return {
      type: 'get_userInfo',
      payload
    }
  }
}

export default connect(mapStateProps, mapDispatchProps)(MyCenter)
