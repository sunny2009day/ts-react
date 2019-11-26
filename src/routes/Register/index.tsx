import React from 'react';
import NavHeader from '../../components/NavHeader';

interface Props{
  history: any
}

export default class Register extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
      <NavHeader history={this.props.history}>个人中心</NavHeader>
      <div>注册</div> 
     </React.Fragment>
    )
  }
}
 