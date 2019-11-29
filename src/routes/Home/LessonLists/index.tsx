import React, {ReactNode} from 'react';

import {Lessons, Lesson} from '../../../store/reducers/home';
import './index.less';
import { Icon, Card, Button, Alert, Skeleton } from 'antd';
import { Link } from 'react-router-dom';

interface Props {
  children?:ReactNode,
  lessons: Lessons,
  getLessons: any
}
export default class LessonList extends React.Component<Props> {
 async componentDidMount() {
  if(this.props.lessons.list.length==0) {
    await this.props.getLessons();
    this.render();
  } 
 }
  render() {
    return (
     <section className="lesson-list">
       <h2><Icon type="bars"/>全部课程本</h2>
       <Skeleton
        loading={this.props.lessons.loading&&
        this.props.lessons.list.length==0} active paragraph={{rows: 8}}>
         {
          this.props.lessons.list.map((lesson: Lesson, 
          index: number)=>{
            <Link key={index} to={`/detail/${lesson._id}`}>
              <Card 
                hoverable = {true}
                style={{width: '100%'}}
                cover={<img src={lesson.poster}/>}
              >
                <Card.Meta title = {lesson.title} 
                description = {<span>价格:{lesson.price}元</span>}
               />
              </Card>
            </Link>
          })
         }
       </Skeleton>
       
       {
         this.props.lessons.hasMore?
         <Button
          loading={this.props.lessons.loading}
          onClick={this.props.getLessons} type="dashed" style={{width: "100%"}}>加载更多</Button>
         :<Alert style={{ textAlign:"center"}}  type="warning" message="我是有底线的"/>
       }

     </section>
    )
  }
}
