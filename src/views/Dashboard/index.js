import React, { Component } from 'react';
import { connect } from 'react-redux'
import cookies from 'react-cookies'
import { getInfo } from '../../api/userApi'
class Dashboard extends Component {

  componentDidMount() {
    if ( cookies.load('token') && this.props.userInfo.length === 0) {
      this.props.getUserInfo()
    }
  }

  render() {
    return (
      <div>
        Dashboard
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = {
  async getUserInfo () {
    const token = cookies.load('token')
    const res = await getInfo(token)
    console.log(res);
    
    return {
      type:'get_userInfo',
      payload: res.data
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
