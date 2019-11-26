import React from 'react';
import NavHeader from '../../components/NavHeader';

interface Props{
  history: any
}
export default class Login extends React.Component<Props> {
  render() {
    return (
      <>
      <NavHeader history={this.props.history}>个人中心</NavHeader>
      <div>登录</div>
      </>
      )
  }
}
 