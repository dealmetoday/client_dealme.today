const mongoose = require('mongoose')
const schemas = require('../model/schemas')
const constants = require('../constants')

const Mall = mongoose.model(constants.MALL_INDEX, schemas.mallSchema, constants.MALL_INDEX)

module.exports = Mall;
