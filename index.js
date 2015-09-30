'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const models = require('./models');
const utils  = require('./utils');
const app = express();

app.use(bodyParser.json());
app.use(cors());
routes.initialize(app, models, utils);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

const server = app.listen(process.env.PORT || 3000, () => {
  const host = server.address();
  console.log('API running at http://%s:%s', host.address, host.port);
});
