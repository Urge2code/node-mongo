'use strict';

const fs = require('fs');
const path = require('path');
const HttpStatus = require('http-status');

exports.initialize = (app, models, utils) => {
  fs
    .readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
    .forEach(file => require(path.join(__dirname, file))(app, models, utils, HttpStatus));
};
