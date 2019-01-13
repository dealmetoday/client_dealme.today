const mongoose = require('mongoose')
const schemas = require('../model/schemas')
const constants = require('../constants')

var User = mongoose.model(constants.USERS, schemas.userSchema, constants.USERS);

module.exports = User;
