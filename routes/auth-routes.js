const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login', { title: 'Log in' });
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('Hey Google User!');
});


module.exports = router;