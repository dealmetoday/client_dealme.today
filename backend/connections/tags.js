const mongoose = require('mongoose')
const schemas = require('../model/schemas')
const json = require('../data/tags.json')
const driver = require('../API')

var API = driver.API;
const TAGS = 'TAGS'

mongoose.connect('mongodb://localhost/tags', { useNewUrlParser: true })
  .then(() => {
      console.log('Connected to Tags Database.');
      mongoose.connection.db.dropDatabase();
      thisDriver = new API(mongoose.connection);

      // Grabbing the constructors
      var Tag = mongoose.model(TAGS, schemas.tagSchema, TAGS);

      // Get data from tags.json and insert into the database
      for (var index in json) {
        var currObj = json[index];
        var newObj = new Tag({ _id: currObj.id, key: currObj.tag});
        newObj.save();
      }

      // for (var index in json) {
      //   var newID = mongoose.Types.ObjectId();
      //   var newObj = new Tag({ _id: newID, key: json[index]});
      //   newObj.save();
      // }

      // for (var index in json) {
      //   var newID = mongoose.Types.ObjectId();
      //   var newObj =
      //   {
      //     _id: newID,
      //     key: json[index]
      //   };
      //   thisDriver.insertOne(TAGS, newObj);
      // }

      console.log('Finished populating the Tags database.');
  })
  .catch(err => console.log('Tags could not connect.', err))

module.exports = exports = mongoose;
