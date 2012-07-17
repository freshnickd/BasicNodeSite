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
    SKN:{name:'Guitar', teacher:nick},
    ASK:{name:'Violin', teacher:jess},
    CGI:{name:'Piano', teacher:kim},
    NGT:{name:'Guitar', teacher:mike},
    KTN:{name:'Trumpet', teacher:jenn}
    
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
    about: 'This is my first node page.',
    contact: 'You can contact us at <address><strong>freshnickd</strong>,<br>5 some st<br>some mail stop<br>MD</address>'
    };
    res.render('page', { title: 'Appointments - ' + name, username: req.session.username, content:contents[name] });
};
