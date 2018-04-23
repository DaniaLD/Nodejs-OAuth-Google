const router = require('express').Router();

router.get('/', isLoggedin, (req, res) => {
    res.render('profile', { user: req.user, title: 'Profile' });
});

// Check if user is loggedin
function isLoggedin(req, res, done) {
    if (req.isAuthenticated()) {
        return done();
    } else {
        res.redirect('/auth/login');
    }
}

module.exports = router;