
/*
 * GET home page.
 */

exports.index = function(db) {
	return function(req, res){
	db.collection('posts').count(function (err, count) {
		res.render('index', {title: count});
	});
      
};

};