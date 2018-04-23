const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoute = require('./routes/profile');
const passportConfig = require('./config/passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const session = require('express-session');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(keys.databaseURL, err => {
    if(err) {
        console.log(`Could not connect to database !!! => ${err}`);
    }

    console.log('Connected to database successfully ...');
});  // Connect to database

app.set("view engine", "ejs");  // Set up view engine

app.use(express.static(__dirname + '/public'));  // Set public folder for static files

// Session
app.use(session({
    secret: [keys.session.secret],
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);  // Authentication Routes
app.use('/profile', profileRoute);  // Profile Route

app.get('/', (req, res) => {
    res.render('home', { title: 'Home', user: req.user });
});

app.listen(port, () => console.log(`App is listening on port: ${port}`));