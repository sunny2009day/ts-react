import React, { ReactNode } from 'react';
import {connect} from 'react-redux';
import actions from '../../store/actions/profile';
import NavHeader from '../../components/NavHeader';

import { TypeRootState } from '../../store/reducers';
import { TypeProfile } from '../../store/reducers/profile';
import { RouteComponentProps, Link } from 'react-router-dom';
import {Form, Icon, Input, Button, message} from 'antd';
import './index.less';
import { FormComponentProps } from 'antd/lib/form/Form';
 
// 当前组件有三个属性来源 1.mapstateToProps 2.actionns对象的返回值 3.来自路由 4.用户传入进来的其他属性
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface IParams {};
type RouteProps =  RouteComponentProps<IParams>;
type Props = StateProps&DispatchProps&RouteProps&FormComponentProps&{
  children?: ReactNode 
}
type State = any;


  class Register extends React.Component<Props> {
  handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
    console.log('进入注册时间')
    event.preventDefault();
    this.props.form.validateFields(async(err, values)=>{
      if(err){
         message.error(err)
      }else {
          this.props.login(values);
      }
    }) 
  }
  render() {
    let { getFieldDecorator} = this.props.form;
    return (
      <React.Fragment>
      <NavHeader history={this.props.history}>登录</NavHeader>
      <Form onSubmit = {this.handleSubmit}>
        <Form.Item>
          {
            getFieldDecorator('username', {
              rules: [
                {required: true, message: '用户名必须输入'}
              ]
            })(
              <Input prefix = {<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} 
              placeholder="请输入用户名" />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('password', {
              rules: [
                {required: true, message: '密码必须输入'} 
              ]
            })(
              <Input prefix = {<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
               type="password" placeholder="请输入密码" />
            )
          }
        </Form.Item>
        
        <Form.Item>
           <Button type="primary" htmlType="submit"
            className="login-form-button">登录</Button>
           或者
           <Link to="/register">立即注册</Link>
        </Form.Item>
      </Form>
     </React.Fragment>
    )
  }
}
let wrappedRegister = Form.create({name: "登录表单"})(Register);

let mapStateToProps = (state: TypeRootState): TypeProfile => state.profile
export default connect(
  mapStateToProps,
  actions
)(wrappedRegister)

 