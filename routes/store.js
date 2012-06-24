exports.home = function(req, res){
  if (typeof req.session.username == 'undefined') res.render('home', { title: 'My First Node Site'})
  else res.redirect('/items');
};

// handler for form submitted from homepage
exports.home_post_handler = function(req, res) {
    // if the username is not submitted, give it a default of "Anonymous"
    username = req.body.username || 'Anonymous';
    // store the username as a session variable
    req.session.username = username;
    // redirect the user to homepage
    res.redirect('/');
};