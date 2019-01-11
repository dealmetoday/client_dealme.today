const mongoose = require('mongoose')
const schemas = require('../model/schemas')
const json = require('../data/auth.json')
const driver = require('../API')

var API = driver.API;
const USERS = 'USERS'
const STORES = 'STORES'

mongoose.connect('mongodb://localhost/auth', { useNewUrlParser: true })
  .then(() => {
      console.log('Connected to Auth Database.');
      mongoose.connection.db.dropDatabase();
      thisDriver = new API(mongoose.connection);

      // Grabbing the constructors
      var userAuth = mongoose.model(USERS + "_AUTH", schemas.authSchema, USERS);
      var storeAuth = mongoose.model(STORES + "AUTH", schemas.authSchema, STORES);

      // Get data from auth.json and insert into the database
      for (var index in json) {
        var currObj = json[index];
        var newObj = null;

        if (currObj["collection"] === USERS) {
          newObj = new userAuth(
            {
            _id: currObj.id,
            role: currObj.role,
            password: currObj.password
          });
        } else if (currObj["collection"] === STORES) {
          newObj = new storeAuth(
            {
            _id: currObj.id,
            role: currObj.role,
            password: currObj.password
          });
        }

        newObj.save();
      }

      // for (var index in json) {
      //   var currObj = json[index];
      //   var newID = mongoose.Types.ObjectId();
      //   var newObj = null;
      //
      //   if (currObj["collection"] === USERS) {
      //     newObj =
      //       {
      //       _id: currObj.id,
      //       role: currObj.role,
      //       password: currObj.password
      //     };
      //     thisDriver.insertOne(USERS, newObj);
      //   } else if (currObj["collection"] === STORES) {
      //     newObj =
      //       {
      //       _id: currObj.id,
      //       role: currObj.role,
      //       password: currObj.password
      //     };
      //     thisDriver.insertOne(STORES, newObj);
      //   }
      // }

      console.log('Finished populating the Auth database.');
  })
  .catch(err => console.log('Auth could not connect.', err))

module.exports = exports = mongoose;
