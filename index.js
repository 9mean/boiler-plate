const express = require('express');
const app = express();
const port = 5000;
const { User } = require('./models/User');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/key');

//aplication/x-www-form-unlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//aplication/json
app.use(bodyParser.json());
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connect'))
  .catch((err) => console.log(err));

app.get('/', (req, res) =>
  res.send('Hello sddsworldddddddddddddddddsddddddd!')
);

app.post('/register', (req, res) => {
  //회원가입할때 필요한 정보들을 client에서 가져오면
  //그것을 데이터 베이스에 넣는다

  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
