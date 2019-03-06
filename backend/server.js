require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const processMessage = require('./process-message');
const models = require('./models');

const app = express();
//const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/chat', (req, res) => {
  models.messages.findAll()
    .then((posts) => {
      res.json({ posts });
    })
  });


app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  console.log(message);
  models.messages.create({
    //userId: req.body.post,
    post: req.body.message

    //AIpost: req.body.message
  })
  .catch((err) => {
    console.log('ERROR while creating a new post');
    res.redirect('/error');
  })
  processMessage(message);

});









app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
})
