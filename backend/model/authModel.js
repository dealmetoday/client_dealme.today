const mongoose = require('mongoose')
const schemas = require('../model/schemas')
const constants = require('../constants')

var userAuth = mongoose.model(constants.USERS + "_AUTH", schemas.authSchema, constants.USERS);
var storeAuth = mongoose.model(constants.STORES + "AUTH", schemas.authSchema, constants.STORES);

exports.userAuth = userAuth;
exports.storeAuth = storeAuth;
