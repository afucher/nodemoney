var Account          = require('../app/models/account');
var Transaction      = require('../app/models/transaction');

exports.list = function(req, res){
  Account.find(function(err,result){
    if (err) throw err;
    res.render('accounts', { title: 'Accounts', accounts: result });
  })
};

exports.show = function(req, res){
  Account.findOne({ '_id' :  req.params.accountID },function(err,account){
    if (err) throw err;
    console.log(account);
    console.log(account.balance);
    Transaction.find({'account._id' : req.params.accountID},function(err,transactions){
      if (err) throw err;
      //console.log(transactions);
      res.render('accounts/show', { account: account, transactions : transactions });  
    })
    
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
  var account_data = {
    name : req.body.account,
    bank : req.body.bank
  };
  if (req.body.openingBalance)
    account_data.openingBalance = req.body.openingBalance*100;
  var account = new Account(account_data);

  account.save( function(error, data){
      if(error){
            console.log(error);
      }
      else{
          console.log("data");
          console.log(data);
          res.redirect('/accounts/'+data._id);
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