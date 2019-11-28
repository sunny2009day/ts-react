let mongoose = require('mongoose');

/**
 * mongoose.set('useFindAndModify',false)
 * findOneAndUpdate()内部会使用findAndModify驱动,驱动即将被废弃,所以弹出警告DeprecationWarning:
 *  Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `us
 */
mongoose.set('useFindAndModify',false); // 全局设置避免警告
let {url} = require('./setting.js');

let conn = mongoose.createConnection(url, {useUnifiedTopology: true, useNewUrlParser: true});

let UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  avatar: String,
  phone: String
});
let SliderSchema = new mongoose.Schema({
  url: String 
});
// 课程的model 
let LessonSchema = new mongoose.Schema({
  order: Number,//顺序
  title: String,//标题
  video: String,//视频
  poster: String, //海报
  url: String,//url地址
  price: Number,//价格
  category: String,//分类 all react vue 
});


let User =  conn.model('User', UserSchema);
let Slider =  conn.model('Slider',SliderSchema);
let Lesson =  conn.model('Lesson',LessonSchema);

module.exports = {
  User,
  Slider,
  Lesson
};