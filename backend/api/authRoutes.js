const mongoose = require('mongoose')
const Utils = require('./utils')
const userAuth = require('../model/authModel').userAuth
const storeAuth = require('../model/authModel').storeAuth
const constants = require('../constants')

module.exports = function(app, dbConn) {
  // Create
  app.post('/auth', function(req, res) {
    const jsonData = req.body;

    var newObj = null;

    if (jsonData["collection"] === constants.USERS) {
      newObj = new userAuth(
        {
        _id: jsonData.id,
        role: jsonData.role,
        password: jsonData.password
      });
    } else if (jsonData["collection"] === constants.STORES) {
      newObj = new storeAuth(
        {
        _id: jsonData.id,
        role: jsonData.role,
        password: jsonData.password
      });
    }

    newObj.save((err, result) => Utils.callBack(res, err, result));
  });

  // Read
  app.get('/auth', function(req, res) {
    Tag.find((err, result) => Utils.callBack(res, err, result));
  });

  // Update
  app.put('/auth', function(req, res) {
    const jsonData = req.body;

    var update =
    {
      key: jsonData.update
    };

    if (jsonData.index == "name") {
      Tag.findOneAndUpdate({ key: jsonData.key}, update, (err, result) => Utils.putCallback(res, err, result));
    } else if (jsonData.index == "ID") {
      Tag.findByIdAndUpdate(jsonData.key, update, (err, result) => Utils.putCallback(res, err, result));
    }
  });

  // delete
  app.delete('/auth', function(req, res) {
    const jsonData = req.body;

    if (jsonData["collection"] === constants.USERS) {
      Tag.findByIdAndDelete(jsonData.id, (err, result) => Utils.callBack(res, err, result));
    } else if (jsonData["collection"] === constants.STORES) {
      Tag.findByIdAndDelete(jsonData.id, (err, result) => Utils.callBack(res, err, result));
    }
  });
};
