const mongoose = require('mongoose')
const schemas = require('../model/schemas')
const constants = require('../constants')

var CheckIn = mongoose.model(constants.CHECKIN, schemas.checkInSchema, constants.CHECKIN);

module.exports = CheckIn;
