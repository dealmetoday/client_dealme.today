const mongoose = require('mongoose')
const schemas = require('../model/schemas')
const constants = require('../constants')
const json = require('../data/users.json')

mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true })
  .then(() => {
      console.log('Connected to User Database.');
      mongoose.connection.db.dropDatabase();

      // Grabbing the constructors
      var User = mongoose.model(constants.USERS, schemas.userSchema, constants.USERS);

      // Get data from users.json and insert into the database
      for (var index in json) {
        var currObj = json[index];
        var newObj = new User(
          {
           _id: currObj.id,
           email: currObj.email,
           first: currObj.first,
           last: currObj.last,
           age: currObj.age,
           gender: currObj.gender,
           location: currObj.location,
           tags: currObj.tags
         });

        newObj.save();
      }

      // for (var index in json) {
      //   var currObj = json[index];
      //   var newID = mongoose.Types.ObjectId();
      //   var newObj =
      //     {
      //      _id: currObj.id,
      //      email: currObj.email,
      //      first: currObj.first,
      //      last: currObj.last,
      //      age: currObj.age,
      //      gender: currObj.gender,
      //      location: currObj.location,
      //      tags: currObj.tags
      //    };
      // }

      console.log('Finished populating the User database.');
  })
  .catch(err => console.log('User could not connect.', err))

module.exports = exports = mongoose;
