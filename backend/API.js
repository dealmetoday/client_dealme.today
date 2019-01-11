const mongoose = require('mongoose')

class API {
  constructor(mongooseConnection) {
    this.con = mongooseConnection;
  }

  insertOne(collectionName, jsonObj) {
    this.con.collection(collectionName).insertOne(jsonObj);
  }
}

exports.API = API;
