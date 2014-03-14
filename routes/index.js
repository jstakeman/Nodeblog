
/*
 * GET home page.
 */

exports.index = function(db) {
	return function(req, res){
	db.collection('posts').find().toArray(function (err, result) {
		if (err) throw err;
		res.render('index', {postlist: result});
	});
      
};

};