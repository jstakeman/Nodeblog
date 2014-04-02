
/*
 * GET home page.
 */

exports.show = function(db, markdown) {
	return function(req, res){
	db.collection('posts').find({}, {sort:[['_id', -1]]}).toArray(function (err, result) {
		if (err) {
			console.log('Something Went Wrong!')
			}
		else {
			for (var i=0; i < result.length; i++){
            var marked = markdown(result[i].postcontent);
			result[i].postcontent = marked;

			}
        db.collection('posts').count(function(err, counter){
          var count = counter;
          console.log(count);
          res.render('dashboard', {postlist: result, counter: count});
        });


		}

	});

};

};
