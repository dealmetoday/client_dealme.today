const mongoose = require('mongoose')
const Utils = require('./utils')
const constants = require('../config/constants')

var Deal = null;
var User = null;

module.exports = function(app, dealsDB, usersDB) {
  // Setting constructor
  Deal = dealsDB.Deals;
  User = usersDB.Users;

  // Create
  app.post('/deals', function(req, res) {
    const jsonData = req.body;
    const newID = mongoose.Types.ObjectId();

    var newObj = new Deal(
      {
        _id: newID,
        tags: jsonData.tags,
        isActive: jsonData.isActive,
        description: jsonData.description,
        creationDate: jsonData.creationDate,
        expiryDate: jsonData.expiryDate,
        format: jsonData.format,
        usesLeft: jsonData.usesLeft,
        views: jsonData.views,
        claims: jsonData.claims,
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
      const query = Utils.dealsQuery(jsonData);
      Deal.find(query, (err, result) => Utils.callBack(res, err, result));
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

  // Increment the number of claims a deal has given a deal and user ID
  app.put('/deals/claim', function(req, res) {
    const queryArgs = req.query;
    var dealID = null;
    var userID = null;

    if (!queryArgs.hasOwnProperty('dealID') || !queryArgs.hasOwnProperty('userID')) {
      // The query is required to have both "dealID" and "userID"
      res.send(constants.ARGS_ERROR);
      return;
    }

    dealID = queryArgs['dealID'].toString();
    userID = queryArgs['userID'].toString();
    console.log(dealID);
    console.log(userID);

    if (!Utils.isValidObjectId(dealID) || !Utils.isValidObjectId(userID)) {
      res.send(constants.ID_ERROR);
      return;
    }
    console.log('valid IDs');

    // Welcome to callback heaven
    Deal.find({_id: dealID}, (err, result) => {
      // Check if deal exists
      if (err || result.length === 0) {
        res.send(constants.NOT_FOUND_ERROR);
      } else {
        // Deal exists. Append it to the given user's deal history
        User.findOneAndUpdate({_id: userID}, {$push: {'dealHistory': dealID}}, (err, result) => {
          if (err || result.length === 0) {
            // User does not exist, send error
            res.send(constants.NOT_FOUND_ERROR);
          } else {
            // User has been updated. Increment the number of claims on the given deal
            Deal.findOneAndUpdate({_id: dealID}, {$inc: {'claims': 1}}, (err, result) => Utils.callBack(res, err, result));
          }
        })
      }
    }).limit(1);  // Limit the deal search to 1 to save a bit of time
  });
};
