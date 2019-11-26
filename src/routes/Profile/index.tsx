import React from 'react';
import { connect } from 'react-redux';
import { TypeRootState } from '../../store/reducers';
import {TypeProfile} from '../../store/reducers/profile';
import actions from '../../store/actions/home';
import { RouteComponentProps} from 'react-router';

import { Descriptions, Button, Alert } from 'antd';
import NavHeader from '../../components/NavHeader'
import './index.less';
interface IState {

}
// 当前组件有三个属性来源 1.mapstateToProps 2.actionns对象的返回值 3.来自路由 4.用户传入进来的其他属性
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface IParams {};
type RouteProps =  RouteComponentProps<IParams>;
type Props = StateProps&DispatchProps&RouteProps&{
  chiLdren?: any
}
type State = any;

class Profile extends React.Component<Props, State>{
  render() {
    let content; // 存放要渲染的内容
    if(/*用户未验证*/ false){ 
      return null;
    }else if(/*已登录*/false) { 
      content = (
        <div className="user-info">
          <Descriptions title="当前登录用户">
            <Descriptions.Item label="用户名" >张三</Descriptions.Item>
            <Descriptions.Item label="手机号" >1891111111</Descriptions.Item>
            <Descriptions.Item label="邮箱" >11@qqq.com</Descriptions.Item>
          </Descriptions>
          <Button type="danger">退出登录</Button>
        </div>
      )
    } else /*如果当前的用户未登录*/ {
      content = (
        <>
         <Alert type="warning" message="当前未登录" description="您好，
         当前尚未登录,请注册或登录"/>
         <div style={{textAlign:"center",padding: '.5rem'}}></div>
         <Button type="dashed" onClick={()=>this.props.history.push('/Login')}>登录</Button>
         <Button type="dashed" onClick={()=>this.props.history.push('/Register')}
         style={{marginLeft: '.5rem'}}>注册</Button>
        </>
      )
    }

    return (
     (
       <section>
         <NavHeader history={this.props.history}>个人中心</NavHeader>
         {content}
       </section>
     )
    )
  }
}

let mapStateToProps = (state: TypeRootState): TypeProfile => state.home;

export default connect(
  mapStateToProps, 
  actions
)(Profile);