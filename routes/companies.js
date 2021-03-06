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
    Company.findOne({name: utils.caseInsensitiveRegex(req.body.name)}, (err, data) => {
      if (err) { next(err); }
      else {
        if (data) {
          res.sendStatus(HttpStatus.CONFLICT);
        } else {
          let newCompany = new Company({
            name: req.body.name,
            type: req.body.type
          });
          newCompany.save((err, data) => {
            if (err) { next(err); }
            else { res.send(HttpStatus.CREATED, data); }
          });
        }
      }
    });
  });

  app.put('/companies/:name', (req, res, next) => {
    let condition = { name: utils.caseInsensitiveRegex(req.params.name) };
    let update = {};
    for (let prop in req.body) {
      update[prop] = req.body[prop];
    }
    Company.update(condition, update, (err, data) => {
      if (err) { next(err); }
      else { res.send(data === null ? HttpStatus.NOT_FOUND : HttpStatus.NO_CONTENT); }
    });
  });

  app.delete('/companies/:name', (req, res, next) => {
    Company.remove({name: utils.caseInsensitiveRegex(req.params.name)}, (err, data) => {
      if (err) { next(err); }
      else { res.send(data === null ? HttpStatus.NOT_FOUND : HttpStatus.NO_CONTENT); }
    });
  });
};
