const mongoose = require('mongoose')
const Utils = require('./utils')

var Deal = null;

module.exports = function(app, dealsDB) {
  // Setting constructor
  Deal = dealsDB.Deals;

  // Create
  app.post('/deals', function(req, res) {
    const jsonData = req.body;
    const newID = mongoose.Types.ObjectId();

    var newObj = new Deal(
      {
        _id: newID,
        tags: jsonData.tags,
        description: jsonData.description,
        creationDate: jsonData.creationDate,
        expiryDate: jsonData.expiryDate,
        format: jsonData.format,
        usesLeft: jsonData.usesLeft,
        views: jsonData.views,
        mall: jsonData.mall,
        store: jsonData.store
      });

    newObj.save((err, result) => Utils.callBack(res, err, result));
  });

  // Read
  app.get('/deals', function(req, res) {
    const jsonData = req.body;

    if (Utils.isEmptyObject(jsonData)) {
      Deal.find((err, result) => Utils.callBack(res, err, result));
    } else {
      var query = jsonData;
      if ("expiryDate" in query) {
        query.expiryDate = {
          $gte: jsonData.expiryDate
        }
      }
      if ("available" in query) {
        if (query.available) {
          query.usesLeft = {
            $ne: 0
          }
        } else {
          query.usesLeft = 0
        }
        delete query.available;
      }

      Deal.find(jsonData, (err, result) => Utils.callBack(res, err, result));
    }
  });

  // Update
  app.put('/deals', function(req, res) {
    const jsonData = req.body;
    var id = jsonData.id;
    delete jsonData.id;
    console.log(jsonData);

    Deal.findByIdAndUpdate(id, jsonData, (err, result) => Utils.putCallback(res, err, result));
  });

  // delete
  app.delete('/deals', function(req, res) {
    const jsonData = req.body;

    Deal.findByIdAndDelete(jsonData.id, (err, result) => Utils.callBack(res, err, result));
  });
};
