import React from 'react';
import { connect } from 'react-redux';
import { TypeRootState } from '../../store/reducers';
import {TypeHome} from '../../store/reducers/home';
import actions from '../../store/actions/home';
import { RouteComponentProps} from 'react-router';
import './index.less';

import HomeHeader from './HomeHeader';
interface IState {

}
// 当前组件有三个属性来源 1.mapstateToProps 2.actionns对象的返回值 3.来自路由 4.用户传入进来的其他属性
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface IParams {};
type RouteProps =  RouteComponentProps<IParams>;
type Props = StateProps&DispatchProps&RouteProps&{
  children?: any
}
type State = any;

class Home extends React.Component<Props, State>{
  render() {
    this.props.setCurrentCategory;
 
    return (
      <div>
        <HomeHeader
        setCurrentCategory= {this.props.setCurrentCategory}
         currentCategory = {this.props.currentCategory}/>
      </div>
    )
  }
}

let mapStateToProps = (state: TypeRootState): TypeHome => state.home;

export default connect(
  mapStateToProps, 
  actions
)(Home);