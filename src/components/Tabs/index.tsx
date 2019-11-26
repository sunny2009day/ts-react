import React from 'react';

import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';
import './index.less';
 
export default class Tabs extends React.Component {
  render() {
    return (
      <footer>
        <NavLink to="/" exact><Icon type="home"></Icon><span>首页</span></NavLink>
        <NavLink to="/mine"><Icon type="home"></Icon><span>我的课程</span></NavLink>
        <NavLink to="/profile"><Icon type="home"></Icon><span>购物中心</span></NavLink>
      </footer>
    )
  }
}