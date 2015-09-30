'use strict';

const fs       = require('fs');
const util     = require('util');
const path     = require('path');
const mongoose = require('mongoose');
const env      = process.env.NODE_ENV || 'dev';
const config   = require(__dirname + '/../config/config.json')[env]['db'];
const uri      = util.format('mongodb://%s:%s@%s:%d/%s', config.user, config.pwd, config.host, config.port, config.db);
let   models   = {};

mongoose.connect(uri, {auth: {authdb: config.authdb}});

fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach(file => {
    let model = require(path.join(__dirname, file))(mongoose);
    models[model.modelName] = model;
  });

models.mongoose = mongoose;

module.exports = models;
