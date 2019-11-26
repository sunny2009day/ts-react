let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let {User} = require('./db');
let app = express();

let cors = require('cors');
// app.use((req, res, next)=>{
//   res.setHead('Access-Control-Allow-Origin', '*');
//   next();
// });
app.use(
  cors({
    origin:["http://localhost:8080", "http://localhost:8081"],
    credentials: true, // 是否允许跨域,发cookie
    allowedHeaders: 'Content-Type',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  })
)
let {url} = require('./setting.js');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'sun',
  store: new MongoStore({url})
}));
// 验证用户登录
app.post('/api/register', async(req,res)=>{
  let user = req.body;
  let result = await User.create(user);
  res.join({
    code: 0,
    data: result
  })

  
});
app.post('/api/login', async(req,res)=>{
  let query = req.body;
  let result = await User.findOne(query);
  if(User) {
    req.session.user = user;
    res.join({
      code: 0,
      data: result
    })
  } else {
    res.join({
      code: 1,
       error: '用户登录失败'
    })
  }
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