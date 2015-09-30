'use strict';

module.exports = mongoose => {
  let Schema = mongoose.Schema;
  let Company = mongoose.model('Company', new Schema ({
    name: String,
    type: String
  }));
  
  return Company;
};
