import React, {ReactNode} from 'react';

import {Sliders} from '../../../store/reducers/home';
import './index.less';
import { Carousel } from 'antd';

interface Props {
  children?:ReactNode,
  sliders: Array<Sliders>,
  getSliders: any
}
export default class HomeSliders extends React.Component<Props> {
 
// static getDerivedStateFromProps() { // mad静态方法无法访问this
//  }

 componentDidMount() {
   console.log(this.props.sliders)
   if(this.props.sliders.length == 0){
      this.props.getSliders();
   }
 }
  render() {
    return (
      <Carousel>
        {
          this.props.sliders.map((item:Sliders, index: number)=> {
            <div key={index}>
             {item.url}
              <img src ={item.url}/>
            </div>
          })
        }
      </Carousel>
    )
  }
}
