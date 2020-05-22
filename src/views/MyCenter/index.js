import React, { Component } from 'react';
import { Layout, Avatar, Typography } from 'antd'
import { connect } from 'react-redux'
import Particles from 'react-particles-js'
import style from './index.module.css'
const { Title } = Typography
const { Header, Content } =  Layout
class MyCenter extends Component {
  render() {
    return (
      <Layout style={{background: '#fff'}}>
        <Header style={{height: 100}}>
          <Particles  className={style.particles} />
          <div style={{margin: 18, overflow: 'hidden'}}>
            <div className={style.avatar} >
                <Avatar src={this.props.userInfo.avatar} size={64}/>
                <span className={style.text}>点击修改</span>
            </div>
            <h2 style={{
              float: 'left',
              marginLeft: 20,
              color: '#fff',
              fontSize: 30
            }}>{ this.props.userInfo.userName }</h2>
          </div>
        </Header>
      </Layout>
    );
  }
}

const mapStateProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

const mapDispatchProps = {
  editInfo () {
    return {
      
    }
  }
}

export default connect(mapStateProps, mapDispatchProps)(MyCenter);
