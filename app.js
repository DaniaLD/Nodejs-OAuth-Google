const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passport = require('./config/passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(keys.databaseURL, err => {
    if(err) {
        console.log(`Could not connect to database !!! => ${err}`);
    }
    
    console.log('Connected to database successfully ...');
});  // Connect to database

app.use('/auth', authRoutes);  // Authentication Routes
app.set("view engine", "ejs");  // Set up view engine
app.use(express.static(__dirname + '/public'));  // Set public folder for static files

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.listen(port, () => console.log(`App is listening on port: ${port}`));