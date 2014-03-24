
/*
 * GET home page.
 */

exports.index = function(db, markdown) {
	return function(req, res){
	db.collection('posts').find({}, {sort:[['_id', -1]]}).toArray(function (err, result) {
		if (err) {
			console.log('Something Went Wrong!')
			} 
		else {
			for (var i=0; i < result.length; i++){
            var marked = markdown.toHTML(result[i].postcontent);
			result[i].postcontent = marked;

			}
			
		    res.render('index', {postlist: result});
		}
		
	});
      
};

};