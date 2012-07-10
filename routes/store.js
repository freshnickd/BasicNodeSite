exports.home = function(req, res) {
  if (typeof req.session.username == 'undefined') res.render('home', { title: 'My First Node Site'});
  else res.redirect('/appointments');
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

var appointments = {
    SKN:{name:'Shuriken', teacher:100},
    ASK:{name:'Ashiko', teacher:690},
    CGI:{name:'Chigiriki', teacher:250},
    NGT:{name:'Naginata', teacher:900},
    KTN:{name:'Katana', teacher:1000}
    
};


// handler for displaying the items
exports.appointments = function(req, res) {
    // don't let nameless people view the items, redirect them back to the homepage
    if (typeof req.session.username == 'undefined') res.redirect('/');
    else res.render('appointments', { title: 'Appointment Grid - Appointments', username: req.session.username, appointments:appointments });
};

// handler for displaying individual items
exports.appointment = function(req, res) {
    // don't let nameless people view the items, redirect them back to the homepage
    if (typeof req.session.username == 'undefined') res.redirect('/');
    else {
        var name = appointments[req.query.id].name;
        var teacher = appointments[req.query.id].teacher;
        res.render('appointment', { title: 'Appoinments - ' + name, username: req.session.username, name:name, teacher:teacher });
    }
};

// handler for showing simple pages
exports.page = function(req, res) {
    var name = req.query.name;
    var contents = {
    about: 'Ninja Store sells the coolest ninja stuff in the world. Anyone shopping here is cool.',
    contact: 'You can contact us at <address><strong>Ninja Store</strong>,<br>1, World Ninja Headquarters,<br>Ninja Avenue,<br>NIN80B7-JP,<br>Nihongo.</address>'
    };
    res.render('page', { title: 'Ninja Store - ' + name, username: req.session.username, content:contents[name] });
};
