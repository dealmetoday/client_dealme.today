const mongoose = require('mongoose')
const Utils = require('./utils')

var User = null;

module.exports = function(app, usersDB) {
  // Setting constructor
  User = usersDB.Users;

  // Create
  app.post('/users', function(req, res) {
    const jsonData = req.body;
    const newID = mongoose.Types.ObjectId();

    var newObj = new User(
      {
        _id: newID,
        email: jsonData.email,
        first: jsonData.first,
        middle: "",
        last: jsonData.last,
        age: -1,
        gender: "",
        location: ""
      });

    newObj.save((err, result) => Utils.callBack(res, err, result));
  });

  // Read
  app.get('/users', function(req, res) {
    const jsonData = req.body;

    if (Utils.isEmptyObject(jsonData)) {
      User.find((err, result) => Utils.callBack(res, err, result));
    } else {
      User.findOne({ email: jsonData.email }, (err, result) => Utils.callBack(res, err, result));
    }
  });

  // Update
  app.put('/users', function(req, res) {
    const jsonData = req.body;
    var id = jsonData.id;
    delete jsonData.id;

    User.findByIdAndUpdate(id, jsonData, (err, result) => Utils.putCallback(res, err, result));
  });

  // delete
  app.delete('/users', function(req, res) {
    const jsonData = req.body;

    User.findByIdAndDelete(jsonData.id, (err, result) => Utils.callBack(res, err, result));
  });
};
