const mongoose = require('mongoose');

exports.isValid = function (value) {
  if (typeof value === 'undefined' || value === null) return false;
  if (typeof value === 'string' && value.trim().length === 0) return false;
  return true;
};

exports.isValidTitle = function (title) {
  return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1;
};

exports.isValidSize = function (size) {
  return ['S', 'XS', 'M', 'X', 'L', 'XXL', 'XL'].indexOf(size) !== -1;
};

exports.isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId.isValid(ObjectId);
};

exports.isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length !== 0;
};

exports.isValidPhone = function (str) {
  if (/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(str)) {
    return true;
  }
  return false;
};

exports.isValidEmail = function (email) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())) {
    return true;
  }
};

// if (/^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(str)) {
// if (/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/.test(str)) {
