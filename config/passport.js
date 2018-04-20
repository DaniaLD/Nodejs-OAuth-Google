const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, info, done) => {
        User.findOne({googleId: info.id}, (err, user) => {
            if(err) {
                console.log(`Error occurded during finding user in database !!! => ${err}`);
            }

            if(!user) {
                // user doesn't exist so create new user
                new User({
                    username: info.displayName,
                    googleId: info.id
                }).save((err, newUser) => {
                    if(err) {
                        console.log(`Error occurded during saving new user !!! => ${err}`);
                    } else {
                        console.log('New user added successfully ...');
                        done(null, newUser);
                    }
                });

            } else {
                done(null, user);
            }
        });
    })
)