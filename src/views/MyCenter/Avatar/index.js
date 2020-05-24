import React, { Component } from 'react'
import { Upload } from 'antd'

import cookies from  'react-cookies'

class Avatar extends Component {
  state = {
    loading: false,
  }

  handleChange = (info) => {
    
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      const avatar = info.file.response.avatar
      this.props.updateAvatar({avatar})
    }
  }

  render() {
    const uploadButton = (
      <div>
        {/* {false ? <LoadingOutlined /> : <PlusOutlined />} */}
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        method='PUT'
        action={`http://localhost:5000/user/${this.props.id}`}
        headers={{
          Authorization: cookies.load('token')
        }}
        onChange={this.handleChange}
      >
        {this.props.avatar ? (
          <img src={this.props.avatar} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    )
  }
}

export default Avatar
