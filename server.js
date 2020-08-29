const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const { config } = require('./server/config');
const routes = require('./route')
const { validateBody, validateParams, validateQuery } = require('./server/middlewares/validate.middleware');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));
app.use(express.static('uploads'));

app.use(
  multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 2500000,
    },
  }).fields([
    {
      name: 'file',
      maxCount: 1,
    },
    {
      name: 'image',
      maxCount: 1,
    },
  ])
);
// app.use('/', routes);
app.use('/', validateBody, validateParams, validateQuery, routes);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  console.log(error)
  res.status(statusCode).send(error);
})
const server = http.createServer(app);
server.listen(config.port);
server.on('listening', () => {
  console.log('listening on ', server.address().port);
  mongoose.connect(config.dbString, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.log(err);
      process.exit(0);
    }
    console.log('DB Connected');
  });

});
server.on('error', (err) => {
  console.log('Err', err);
  process.exit(1);
})



