const express = require('express');
const app = express();
const port = 5000;
const { User } = require('./models/User');
const bodyParser = require('body-parser');

const config = require('./config/key');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
//aplication/x-www-form-unlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//aplication/json
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connect'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello 안녕하세요'));

app.post('/register', (req, res) => {
  //회원가입할때 필요한 정보들을 client에서 가져오면
  //그것을 데이터 베이스에 넣는다

  const user = new User(req.body);
  console.log(user);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
app.post('/login', (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.',
      });
    }
    //있다면 비밀번호가 일치하는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        });
      //한다면 토큰생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        //토큰을 저장한다 어디에? 쿠키,로컬스토리지
        res
          .cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
