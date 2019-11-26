import React from 'react';
import { connect } from 'react-redux';
import { TypeRootState } from '../../store/reducers';
import {TypeMine} from '../../store/reducers/mine';
import actions from '../../store/actions/home';
import { RouteComponentProps} from 'react-router';
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

class Mine extends React.Component<Props, State>{
  render() {
    this.props.setCurrentCategory;
 
    return (
      <div>我的课程</div>
    )
  }
}

let mapStateToProps = (state: TypeRootState): TypeMine => state.home;

export default connect(
  mapStateToProps, 
  actions
)(Mine);