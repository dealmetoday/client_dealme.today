const mongoose = require('mongoose')
const schemas = require('../model/schemas')
const constants = require('../constants')

var Deal = mongoose.model(constants.DEALS, schemas.dealSchema, constants.DEALS);

module.exports = Deal;
