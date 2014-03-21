
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var post = require('./routes/post');
var signin = require('./routes/login.js');
var http = require('http');
var path = require('path');
var app = express();


if ('production' == process.env.NODE_ENV){
  var env = { 'username': process.env.USERNAME ,
              'password': process.env.PASSWORD ,
              'dburi'   : process.env.DBURI
          }

}
else {
	var env = require('./env.json');
}

// Database
var mongo = require('mongoskin');
var ObjectId = require('mongoskin').ObjectID;
var db = mongo.db( env.dburi, {native_parser:true});



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('1234'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

app.get('/', routes.index(db));
app.get('/newpost', restrict, post.new);
app.post('/createpost', restrict, post.create(db));
app.del('/deletepost/:_id', restrict, post.delete(db));
app.get('/post/:slug', post.show(db));
app.get('/post/edit/:_id', restrict, post.edit(db));
app.put('/post/update/:_id', restrict, post.update(db));
app.get('/login', signin.login);
app.post('/login', signin.check(env));

var port = Number(process.env.PORT || 3000);

http.createServer(app).listen(port), function(){
  console.log('Express server listening on port ' + port);
};
