// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var accountSchema = mongoose.Schema({

    name : String,
    bank : String

});

// methods ======================
// generating a hash

// create the model for users and expose it to our app
module.exports = mongoose.model('Account', accountSchema);
