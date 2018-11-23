
const errMsg = { "Error" : "An error has occured" };
const testMsg = { "Testing" : "Yeet" };

const insertType = {
  INSERT: 1,
  UPDATE: 2
};

Object.freeze(insertType);

exports.insertType = insertType;

exports.testMsg = testMsg;

exports.putCallback = function(res, err, output, type) {
  if (err) {
    res.send(errMsg);
  }
  else {
    switch (type) {
      case insertType.INSERT:
        res.send(output.ops);
        break;
      case insertType.UPDATE:
        var retVal = {"Updated": "Updated"};
        res.send(retVal);
        break;
    }
  }
};

exports.delCallback = function(res, err, output) {
  if (err) {
    res.send(errMsg);
  }
  else {
    res.send(output.result);
  }
};

exports.getArrCallback = function(res, err, output) {
  if (err) {
    res.send(errMsg);
  }
  else {
    // Prune the JSON array to get rid of the ID field
    pruneArray(output);
    res.send(output);
  }
};

exports.getObjCallback = function(res, err, output) {
  if (err) {
    res.send(errMsg);
  }
  else {
    // Prune the JSON array to get rid of the ID field
    pruneArray(output);
    res.send(output[0]);
  }
};

function pruneArray(arr) {
  arr.forEach(entry => {
    delete(entry["_id"]);
  });
}
