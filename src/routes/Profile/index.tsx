import React from 'react';
import { connect } from 'react-redux';
import { TypeRootState } from '../../store/reducers';
import {TypeProfile} from '../../store/reducers/profile';
import actions from '../../store/actions/profile';
import { RouteComponentProps} from 'react-router';

import { Descriptions, Button, Alert, Upload, Icon, message } from 'antd';
import NavHeader from '../../components/NavHeader';
import LOGIN_TYPES from "../../typings/login-types";
import './index.less';
 
// 当前组件有三个属性来源 1.mapStateToProps 2.actions对象的返回值 3.来自路由 4.用户传入进来的其他属性
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface IParams {};
type RouteProps =  RouteComponentProps<IParams>;
type Props = StateProps&RouteProps&DispatchProps&{
  children?: any
}
 
class Profile extends React.Component<Props>{
  state = {
    loading: false,
    imageUrl: ''
  };

  async componentDidMount() { // 组件挂载完成
     // 向服务器请求登录状态
     await this.props.validate();
  }
  handleChange = (info: any) =>{
   if(info.file.status === 'uploading') {
     this.setState({loading: true});
   } else if(info.file.status == 'done'){
     let {code, data, error} = info.file.response; // 获取接口的响应体
     if(code === 0) {
       this.setState({
         loading: false,
         imageUrl: data
       }, ()=> this.props.changeAvatar(data))
     } else {
       message.error(error);
     }
   }
  }
  render() {
    let { user } = this.props;
    let content; // 存放要渲染的内容 
    if(/*已登录*/this.props.loginState == LOGIN_TYPES.LOGINED) { 
      let imageUrl = this.state.imageUrl || user.avatar; 
      content = (
        <div className="user-info">
          <Descriptions title="当前登录用户">
            <Upload/>
            <Descriptions.Item label="头像" >
              <Upload name="avatar"
              listType ="picture-card" 
              className="avatar-uploader"
              showUploadList = {false}
              withCredentials = {true}
              action ="http://localhost:9000/api/uploadAvatar"
              beforeUpload = {beforeUpload}
              data = {{userId: user._id}}
              onChange = {this.handleChange}
              >
               {
                 this.state.loading?<Icon type="loading"/>:
                 <img src = {imageUrl}/>
               }
              </Upload>
            </Descriptions.Item>
            <Descriptions.Item label="用户名" >{user.username}</Descriptions.Item>
            <Descriptions.Item label="手机号" >{user.phone}</Descriptions.Item>
            <Descriptions.Item label="邮箱" >{user.email}</Descriptions.Item>
          </Descriptions>

          <Button type="danger" onClick= {async event => {
            await this.props.logout();
            this.props.history.push('/login')

          }}
          >退出登录</Button>
        </div>
      )
    } else /*如果当前的用户未登录*/ {
      content = (
        <div className="user-info">
         <Alert type="warning" message="当前未登录" description="您好，
         当前尚未登录,请注册或登录"/>
         <div style={{textAlign: 'center',padding: '.5rem'}}>
         <Button type="dashed" onClick={()=>this.props.history.push('/login')}>登录</Button>
         <Button type="dashed" onClick={()=>this.props.history.push('/register')}
         style={{marginLeft: '.5rem'}}>注册</Button>
        </div>
        </div>
      )
    }
    return (
     (
      <React.Fragment>
         <section>
         <NavHeader history={this.props.history}>个人中心</NavHeader>
         {content}
       </section>
      </React.Fragment>
     )
    )
  }
}

let mapStateToProps = (state: TypeRootState): TypeProfile => state.profile

 
export default connect(
  mapStateToProps, 
  actions
)(Profile); // 我去,视频中也有报错

function beforeUpload(file: any) {
  console.log(file.type);
  const isJpgOrPng = file.type == 'image/jpg'|| file.type == 'image/jpeg'|| file.type == 'image/png';
  if(!isJpgOrPng) {
     message.error('只能上传jpg或png格式的组件')
  } 
  const isLessThan2M = file.size/1024/1024<2;
  if(!isLessThan2M) {
     message.error('图片不能大于2m');
  }
  return isJpgOrPng && isLessThan2M;
}