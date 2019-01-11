const mongoose = require('mongoose')
const schemas = require('../model/schemas')
const json = require('../data/malls.json')
const driver = require('../API')

var API = driver.API;
const MALLS = 'MALLS'
const STORES = 'STORES'

mongoose.connect('mongodb://localhost/malls', { useNewUrlParser: true })
  .then(() => {
      console.log('Connected to Malls Database.');
      mongoose.connection.db.dropDatabase();
      thisDriver = new API(mongoose.connection);

      // Grabbing the constructors
      var Mall = null;
      var Store = null;
      var mallID = null;

      // Get data from users.json and insert into the database
      for (var index in json) {
        var currI = json[index];
        var currMall = currI[0];
        mallID = currMall.id;

        Mall = mongoose.model(MALLS, schemas.mallSchema, mallID);
        Store = mongoose.model(STORES, schemas.storeSchema, mallID);

        var newMall = new Mall(
          {
            _id: currMall.id,
            address: currMall.address,
            name: currMall.name,
            tags: currMall.tags,
            numOfStores: currMall.numOfStores
          });

        for (var j = 1; j < currI.length; j++) {
          var currStore = currI[j];

          var newStore = new Store(
            {
              _id: currStore.id,
              location: currStore.location,
              name: currStore.name,
              email: currStore.email,
              description: currStore.description,
              parentCompany: currStore.parentCompany
            });

            newStore.save();
        }

        newMall.save();
      }

      console.log('Finished populating the Malls database.');
  })
  .catch(err => console.log('Malls could not connect.', err))

module.exports = exports = mongoose;
