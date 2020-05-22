import {
  UploadOutlined,
  TeamOutlined,
  HomeOutlined,
  BarsOutlined
} from '@ant-design/icons'

export default [
  {
    title: '首页',
    path: '/home',
    permission: 1,
    icon: HomeOutlined,
  },
  {
    title: '用户管理',
    path: '/user-manage',
    permission: 3,
    icon: BarsOutlined,
    children: [
      {
        title: '用户列表',
        icon: TeamOutlined,
        path: '/user-manage/users',
      },
    ],
  }
]
