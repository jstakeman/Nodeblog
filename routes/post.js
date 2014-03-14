
/*
 * Temporary Post Controllers
 */

exports.new = function(req, res){
  res.render('newpost');
};


exports.create = function(db){
	return function(req, res) {
		var postTitle = req.body.posttitle;
		var postContent = req.body.postcontent;

		var collection = db.collection('posts');

		collection.insert({
			"posttitle" : postTitle,
			"postcontent" : postContent
		}, function (err, doc) {
			if (err) {
				res.send("There was a problem")
			}
			else {
				res.location("/");
				res.redirect("/");
			}
		});
	}
}

exports.show = function(db){
	return function(req, res) {
        db.collection('posts').findOne({_id:require('mongoskin').ObjectID(req.params._id)}, function (err, result) {
		    if (err) throw err;
		    res.render('show', {post: result});
	    });
    } 
}


