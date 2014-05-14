var Account          = require('../app/models/account');
var accounts = [
  { name: 'CC - Santander', bank: 'Santander' },
  { name: 'Cartão Porto Seguro', bank: 'Porto Seguro' }
];

exports.list = function(req, res){
  Account.find(function(err,result){
    if (err) throw err;
    res.render('accounts', { title: 'Accounts', accounts: result });
  })
};

exports.show = function(req, res){
  console.log(req.params.accountID);
  Account.findOne({ '_id' :  req.params.accountID },function(err,account){
    if (err) throw err;
    res.render('accounts/show', { title: account.name, account: account });
  })
};

exports.load = function(req, res, next){
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
};

exports.edit = function(req, res){
  res.render('users/edit', {
    title: 'Editing user ' + req.user.name,
    user: req.user
  });
};

exports.update = function(req, res){
  // Normally you would handle all kinds of
  // validation and save back to the db
  var user = req.body.user;
  req.user.name = user.name;
  req.user.email = user.email;
  res.redirect('back');
};