// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// define the schema for our user model
var transactionSchema = Schema({

    description : String
  , value : Number
  , credit : Boolean
  , account : {
  	  _id : ObjectId
  	, name : String
  }
  , created_at    : { type: Date }
  , updated_at    : { type: Date }

},{ strict: false });


transactionSchema.pre('save', function(next){
  this.updated_at = new Date;
  if ( !this.created_at ) {
    this.created_at = new Date;
  }
  if ( typeof this.credit === 'undefined' ) {
  	this.credit = true;
  }
  next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Transaction', transactionSchema);
