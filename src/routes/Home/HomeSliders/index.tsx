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
 async componentDidMount() {
   if(this.props.sliders.length == 0){
     await this.props.getSliders();
   }
 }
  render() {
    return (
      <Carousel>
        {         
          this.props.sliders?this.props.sliders.map((item: Sliders,index: number)=> {
           <div key={index}>
              <img src ={item.url}/>
           </div>
          }):'<img src="http://127.0.0.1:9000/assets/img/9252150_092049419327_2.jpg"/>'
        }
      </Carousel>
    )
  }
}
