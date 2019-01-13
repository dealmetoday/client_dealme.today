const express = require('express');
const router = express.Router();
const axios = require("axios");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
FacebookStrategy = require('passport-facebook').Strategy;

const CONFIG = require('../../../config/config_dev')

passport.use(new GoogleStrategy({
  clientID: CONFIG.GOOGLE_CLIENT_ID,
  clientSecret: CONFIG.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/api/auth/google/callback',
  accessType: 'offline'
}, (accessToken, refreshToken, profile, cb) => {
  // Extract the minimal profile information we need from the profile object
  // provided by Google
  cb(null, extractProfile(profile));
}));



passport.use(new FacebookStrategy({
    clientID: CONFIG.FACEBOOK_APP_ID,
    clientSecret: CONFIG.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
      done(null, null);
  }
));


function extractProfile (profile) {
  let imageUrl = '';
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  return {
    id: profile.id,
    displayName: profile.displayName,
    image: imageUrl
  };
}

function addTemplateVariables (req, res, next) {
  res.locals.profile = req.user;
  res.locals.login = `/auth/login?return=${encodeURIComponent(req.originalUrl)}`;
  res.locals.logout = `/auth/logout?return=${encodeURIComponent(req.originalUrl)}`;
  next();
}

function authRequired (req, res, next) {
  if (!req.user) {
    req.session.oauth2return = req.originalUrl;
    return res.redirect('/auth/login');
  }
  next();
}


router.get('/login/google', (req, res, next) => {
    if (req.query.return) {
      req.session.oauth2return = req.query.return;
    }
    next();
  },
  passport.authenticate('google', { scope: ['email', 'profile'] })
)
router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));




router.get('/google/callback',
  // Finish OAuth 2 flow using Passport.js
  passport.authenticate('google'),
  // Redirect back to the original page, if any
  // User information is stored in req.user and information is taken from extractProfile
  (req, res) => {
    // TODO call a function here to check to see if user exist in our database, and if not then create a new user
    const redirect = req.session.oauth2return || '/user?';
    delete req.session.oauth2return;
    res.redirect(redirect + `user_id=${req.user.id}`);
  }
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
    failureRedirect: '/login' }))

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});



module.exports = router
