exports.login = function(req, res) {
	res.render('login');
};


exports.check = function(env){
	return function(req, res) {
	var username = req.body.username;
	var password = req.body.password;


	if(username == env.username && password == env.password) {
		req.session.regenerate(function(){
			req.session.user = username;
			res.redirect('/dashboard');
		});
	}
	else {
		res.redirect('login');
		console.log(env.password);
		console.log(env.username);
	}
};

};
