var account = require('./account');
var transaction = require('./transaction');
module.exports = function(app, passport) {

	//Accounts
	app.get('/accounts/new',account.new);
	app.get('/accounts', isLoggedIn ,account.list);
	app.get('/accounts/:accountID',account.show);
	app.post('/accounts',account.insert);

	//Transactions
	app.get('/accounts/:accountID/transaction',transaction.show);
	app.post('/accounts/:accountID/transaction',transaction.insert);

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') }); 
	});

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});


		// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/accounts', // redirect to the accounts section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/accounts', // redirect to the accounts section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
