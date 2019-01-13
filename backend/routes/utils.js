const constants = require('../config/constants')

exports.callBack = function(res, err, result) {
  if (err) {
    console.log(err);
    res.send(constants.ERR);
  } else {
    res.send(result);
  }
}

exports.putCallback = function(res, err, output, type) {
  if (err) {
    console.log(err);
    res.send(constants.ERR);
  }
  else {
      var retVal = {"Updated": "Updated"};
      res.send(retVal);
  }
};

exports.getArrCallback = function(res, err, output) {
  if (err) {
    res.send(constants.ERR);
  }
  else {
    res.send(output);
  }
};

exports.getObjCallback = function(res, err, output) {
  if (err) {
    res.send(constants.ERR);
  }
  else {
    res.send(output[0]);
  }
};

// This should work both there and elsewhere.
exports.isEmptyObject = function(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
