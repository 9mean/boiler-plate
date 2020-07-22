const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://9mean:9255@boiler-plate.roz4c.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log('MongoDB Connect'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello sddsworldsd!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
