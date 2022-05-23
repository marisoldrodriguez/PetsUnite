require('dotenv').config()
const mongoose = require('mongoose');

//DATABASE
const mongooseURI = process.env.MONGO_URI;

mongoose.connect(mongooseURI, {useNewUrlParser: true, useUnifiedTopology: true},
    () => {console.log('connected to mongo: ', mongooseURI)}
)

module.exports.Adoption = require('./adoption');
module.exports.Event = require('./event');
module.exports.Service = require('./service');
module.exports.User = require('./user');