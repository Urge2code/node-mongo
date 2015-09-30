'use strict';

module.exports = (app, models, utils, HttpStatus) => {
  const Company = models.Company;

  app.get('/companies', (req, res, next) => {
    Company.find({}, (err, data) => {
      if (err) { next(err); }
      else { res.send(data); }
    });
  });

  app.get('/companies/:name', (req, res, next) => {
    Company.findOne({name: utils.caseInsensitiveRegex(req.params.name)}, (err, data) => {
      if (err) { next(err); }
      else { res.send(data === null ? HttpStatus.NOT_FOUND : data); }
    });
  });

  app.post('/companies', (req, res, next) => {

  });

  app.put('/companies/:name', (req, res, next) => {

  });

  app.delete('/companies/:name', (req, res, next) => {

  });
};
