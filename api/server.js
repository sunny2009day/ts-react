let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let {User, Slider, Lesson} = require('./db');
let app = express();
let path = require('path');
let {md5} = require('./utils.js');
let multer = require('multer');
 
let upload = multer({ dest: path.join(__dirname, 'public')});
let cors = require('cors');
// app.use((req, res, next)=>{
//   res.setHead('Access-Control-Allow-Origin', '*');
//   next();
// });

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin:["http://127.0.0.1:8080", "http://localhost:8080"],
    credentials: true, // 是否允许跨域,发cookie
    allowedHeaders: 'Content-Type,x-requested-with',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  })
)
let {url} = require('./setting.js');

app.use(bodyParser.urlencoded({ extended: true })); 
// true: 使用第三方模块qs来处理; false: 使用系统模块querystring来处理
app.use(bodyParser.json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'sun',
  store: new MongoStore({url})
}));
app.use(function (req, res, next) {
  res.success = function (data) {
      res.json({ code: 0, data });
  }
  res.error = function (error) {
      res.json({ code: 1, error });
  }
  next();
});
app.use(function (req, res, next) {
  if(req.methods === 'OPTIONS') { //预检查直接成功
    Response.sendStatus(200);
  } else {
    next();
  }

});


app.post('/api/uploadAvatar', upload.single('avatar'), async(req, res)=>{
    let avatar = `http://localhost:9000/${req.file.filename}`;
    await User.findByIdAndUpdate(req.body.userId, {avatar});
    if(req.session.user&&req.session.user.avatar) {
      req.session.user.avatar = avatar;
    }
    req.session.user.avatar = avatar;
    res.success(avatar)
})
// 验证用户登录
app.post('/api/register', async(req,res)=>{
  let user = req.body;
  user.avatar = `https://secure.gravatar.com/avatar/${md5(user.email)}?s=48`;
  let result = await User.create(user);
  res.json({
    code: 0,
    data: result
  })

  
});
app.post('/api/login', async(req,res)=>{
  let query = req.body;
  let user = await User.findOne(query);
  if(User) {
    // setTimeout(()=>{
      req.session.user = user;
      res.json({
        code: 0,
        data: user
      })
    // });
  } else {
    res.json({
      code: 1,
       error: '用户登录失败'
    })
  }
});
app.post('/api/logout', async(req,res)=>{
  req.session.user = null;
  res.success('退出登录成功');
});

app.post('/api/getSliders', async(req,res)=>{
 
  let sliders = await Slider.find();
  console.log(sliders)
  res.success(sliders);
});
app.post('/api/getLessons', async(req,res)=>{
  let { category = 'all', offset = 0, limit = 5} = req.query;
  let query = {};
  if(category !='all') {
    query['category'] = category;
  }
  let list = await Lesson.find(query).sort({order: 1})
  .skip(offset);
  res.success(list);
});

app.get('/api/validate', async(req,res)=>{
  if(req.session.user) {
    res.json({
      code: 0,
      data: req.session.user
    })
  } else {
    res.json({
      code: 1,
      data: '此用户尚未登录'
    })
  }
});

app.listen(9000);