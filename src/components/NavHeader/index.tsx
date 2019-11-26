import React from 'react';

import './index.less';
import { Icon } from 'antd';

export default class NavHeader extends React.Component {
  render() {
    return (
      <div className="nav-header">
         <Icon type="left"></Icon>
         {this.props.children}
      </div>
    )
  }
}
