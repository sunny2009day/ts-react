import React from 'react';
import './index.less';
import { Icon } from 'antd'; 
import {Transition } from 'react-transition-group';
const duration = 300;
const defaultStyle = {
  opacity: 0,
  display: 'none',
  transition: `all ${duration}ms ease-in-out`
};
interface  TypeTransitionStyle {
  entering: React.CSSProperties,
  entered: React.CSSProperties,
  exiting: React.CSSProperties,
  exited: React.CSSProperties,
  unmounted: React.CSSProperties
}
const transitionStyle:TypeTransitionStyle = {
  entering: {opacity: 1,  display: 'none'},
  entered: {opacity: 1, display: 'block' },
  exiting: {opacity: 0, display: 'none'},
  exited: {opacity: 1, display: 'none'},
  unmounted: {opacity: 0, display: 'none'}
}
interface props {
  currentCategory: string,
  setCurrentCategory: any
}
interface State {
 in: Boolean
}
export default class HomeHeader extends React.Component<props, State> {
  state = {in: false};
  setCurrentCategory=(event: React.MouseEvent<HTMLUListElement>)=> {
    let target: EventTarget = event.target;
    let type = (target as HTMLUListElement).dataset.type;
     this.setState({in: false}, ()=>this.props.setCurrentCategory(type))
  }
  render() {
    return (
      <div className="home-header">
        <div className="header-logo">
          <img src="https://secure.gravatar.com/avatar/undefined?s=48" />
          <Icon type="bars" onClick={()=>this.setState({in: !this.state.in})} />
        </div>
        <Transition in={this.state.in} timeout = {duration}>
          {
            state=>(
              <ul 
              style={{
                ...defaultStyle,
                ...transitionStyle[state]
              }}
              className="header-category" onClick={this.setCurrentCategory}>
              <li data-type="all" className={this.props.currentCategory=='all'?'active':''}>全部</li>
              <li  data-type="react" className={this.props.currentCategory=='react'?'active':''}>React</li>
              <li  data-type="vue"  className={this.props.currentCategory=='vue'?'active':''}>Vue</li>
            </ul>
            )
          }
        </Transition>

      </div>
    )
  }
}
