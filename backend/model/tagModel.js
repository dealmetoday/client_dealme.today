const mongoose = require('mongoose')
const schemas = require('../model/schemas')
const constants = require('../constants')

var Tag = mongoose.model(constants.TAGS, schemas.tagSchema, constants.TAGS);

module.exports = Tag;
