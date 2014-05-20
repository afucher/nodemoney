// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var accountSchema = mongoose.Schema({

      name : String
    , bank : String
    , balance : Number
    , created_at    : { type: Date }
    , updated_at    : { type: Date }

},{ strict: false });

accountSchema.pre('save', function(next){
  this.updated_at = new Date;
  if ( !this.created_at ) {
    this.created_at = new Date;
  }
  next();
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Account', accountSchema);
