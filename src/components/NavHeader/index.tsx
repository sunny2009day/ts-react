import React from 'react';

import './index.less';
import { Icon } from 'antd';

interface Props {
  history: any;
  children: any
}
export default  function NavHeader(props:Props) {
    return (
      <div className="nav-header" onClick={()=>props.history.goBack()}>
         <Icon type="left"></Icon>
         {props.children}
      </div>
    )
}
// export default class NavHeader extends React.Component<Props> {
//   render() {
//     return (
//       <div className="nav-header" onClick={()=>this.props.history.goBack()}>
//          <Icon type="left"></Icon>
//          {this.props.children}
//       </div>
//     )
//   }
// }
