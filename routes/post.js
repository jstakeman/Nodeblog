
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
		var slug = req.body.slug;

		var collection = db.collection('posts');

		collection.insert({
			"posttitle" : postTitle,
			"postcontent" : postContent,
			"slug" : slug
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

exports.show = function(db, markdown){
	return function(req, res) {
        db.collection('posts').findOne({slug: (req.params.slug)}, function (err, result) {
		    if (err) throw err;
		    var marked = markdown.(result.postcontent);
		    result.postcontent = marked;
		    res.render('show', {post: result});
	    });
    } 
}

exports.edit = function(db){
	return function(req, res){
		db.collection('posts').findOne({_id:require('mongoskin').ObjectID(req.params._id)}, function (err, result) {
			if (err) throw err;
			res.render('edit', {post: result});
		});
	}
}

exports.update = function(db){
    return function(req, res){
    	 var updated = {
    	 	"posttitle" : req.body.posttitle,
			"postcontent" : req.body.postcontent,
			"slug" : req.body.slug
		};
    	 db.collection('posts').update({_id:require('mongoskin').ObjectID(req.params._id)}, 
    	 {$set:updated}, {safe:true, multi:false}, 
    	 function(e, result){
           if (e) {
				res.send("There was a problem")
			}
			else {
				res.location("/");
				res.redirect("/");
			}
		})
    }
}

exports.delete = function(db){
	return function(req, res) {
		db.collection('posts').removeById(req.params._id, function(err, result) {
			if (err) {
				res.send("There was a problem")
			}
			else {
				res.location("/");
				res.redirect("/");
			}
		})

	}
}




