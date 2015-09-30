'use strict';

exports.caseInsensitiveRegex = str => {
  return { $regex: new RegExp(str, "i") };
};
