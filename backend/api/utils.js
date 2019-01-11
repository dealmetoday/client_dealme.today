const constants = require('../constants')

exports.callBack = function(res, err, result) {
  if (err) {
    res.send(constants.ERR);
  } else {
    res.send(result);
  }
}

exports.putCallback = function(res, err, output, type) {
  if (err) {
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
