
/**
 * Module dependencies.
 */

var express = require('express')
  , store = require('./routes/store');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', store.home);

app.post('/', store.home_post_handler);

app.get('/appointments',store.appointments);

app.get('/appointment/:id',store.appointment);

app.get('/page', store.page);

app.get('/logout', function(req, res) {
        // delete the session variable
        delete req.session.username;
        // redirect user to homepage
        res.redirect('/');
        });

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
