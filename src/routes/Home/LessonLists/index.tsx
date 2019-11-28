import React, {ReactNode} from 'react';

import {Lessons} from '../../../store/reducers/home';
import './index.less';
import { Icon } from 'antd';

interface Props {
  children?:ReactNode,
  lessons: Lessons,
  getLessons: any
}
export default class HomeSliders extends React.Component<Props> {
 componentDidMount() {
  
 }
  render() {
    return (
     <section>
       <h3><Icon type="bars"></Icon>全部课程本</h3>
     </section>
    )
  }
}
