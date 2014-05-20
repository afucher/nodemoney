var Transaction = require('../app/models/transaction');
var Account = require('../app/models/account');

exports.list = function(req, res){
  Transaction.find(function(err,result){
    if (err) throw err;
    res.render('transactions', { title: 'Transaction', transactions: result });
  })
};

exports.show = function(req, res){
  Transaction.findOne({ '_id' :  req.params.transactionID },function(err,transaction){
    if (err) throw err;
    res.render('transactions/show', { transaction: transaction });
  })
};

/*exports.load = function(req, res, next){
  var id = req.params.id;
  req.user = users[id];
  if (req.user) {
    next();
  } else {
    next(new Error('cannot find user ' + id));
  }
};

exports.view = function(req, res){
  res.render('users/view', {
    title: 'Viewing user ' + req.user.name,
    user: req.user
  });
};*/

exports.edit = function(req, res){
  res.render('users/edit', {
    title: 'Editing user ' + req.user.name,
    user: req.user
  });
};

exports.insert = function(req, res){
  var transaction_data = {
      value : req.body.value
    , credit : (! (req.body.credit === undefined))
    , account : {
          _id : req.body.account_id
        , name : req.body.account_name
      }
    , description : req.body.description
  };
  //console.log( ! (req.body.credit === undefined));
  var transaction = new Transaction(transaction_data);

  transaction.save( function(error, data){
      if(error){
            console.log(error);
      }
      else{
          var value = data.value;

          console.log(data.credit);
          if ( !data.credit ) value = value * -1; 
          var conditions = { _id: data.account._id }
            , update = { $inc: { balance: value }}
          Account.update(conditions, update, callback);

          function callback (err, numAffected) {
            // numAffected is the number of updated documents
            console.log('affected rows: ' + numAffected);
          };
          res.redirect('/accounts/'+req.body.account_id);
          //exports.list(req,res);
      }
  });

};

exports.new = function(req, res){
  res.render('accounts/new');
};

exports.update = function(req, res){
  // Normally you would handle all kinds of
  // validation and save back to the db
  var user = req.body.user;
  req.user.name = user.name;
  req.user.email = user.email;
  res.redirect('back');
};