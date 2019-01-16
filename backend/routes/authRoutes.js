const mongoose = require('mongoose')
const Utils = require('./utils')
const constants = require('../config/constants')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const CONFIG = require('../../config/config_dev');

var userAuth = null;
var storeAuth = null;

passport.use(new GoogleStrategy({
  clientID: CONFIG.GOOGLE_CLIENT_ID,
  clientSecret: CONFIG.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback',
  accessType: 'offline'
}, (accessToken, refreshToken, profile, cb) => {
  // Extract the minimal profile information we need from the profile object
  // provided by Google
  cb(null, extractProfile(profile));
}));



passport.use(new FacebookStrategy({
    clientID: CONFIG.FACEBOOK_APP_ID,
    clientSecret: CONFIG.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, extractProfile(profile));
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





module.exports = function(app, authDB) {
  // Setting constructor
  userAuth = authDB.UserAuths;
  storeAuth = authDB.StoreAuths;

  // Create
  app.post('/auth', function(req, res) {
    const jsonData = req.body;

    var newObj = null;

    if (jsonData["collection"] === constants.USERS) {
      newObj = new userAuth(
        {
        _id: jsonData.id,
        role: jsonData.role,
        password: jsonData.password
      });
    } else if (jsonData["collection"] === constants.STORES) {
      newObj = new storeAuth(
        {
        _id: jsonData.id,
        role: jsonData.role,
        password: jsonData.password
      });
    }

    newObj.save((err, result) => Utils.callBack(res, err, result));
  });

  // Read
  app.get('/auth', function(req, res) {
    const jsonData = req.body;

    if (jsonData["collection"] === constants.USERS) {
      userAuth.findById(jsonData.id, (err, result) => Utils.callBack(res, err, result));
    } else if (jsonData["collection"] === constants.STORES) {
      storeAuth.findById(jsonData.id, (err, result) => Utils.callBack(res, err, result));
    }
  });


  // Call to Google oAuth2 API
  app.get('/auth/login/google', (req, res, next) => {
      if (req.query.return) {
        req.session.oauth2return = req.query.return;
      }
      next();
    },
    passport.authenticate('google', { scope: ['email', 'profile'] })
  );

  // Call to Facebook's oAuth API
  app.get('/auth/login/facebook', (req,res,next) => {
    if (req.query.return) {
      req.session.oauth2return = req.query.return;
    }
    next();
  },

    passport.authenticate('facebook', { scope: ['email'] })
  );

  // redirect route for when google sucessfully authenticates user
  app.get('/auth/google/callback',
    // Finish OAuth 2 flow using Passport.js
    passport.authenticate('google'),
    // Redirect back to the original page, if any
    // User information is stored in req.user and information is taken from extractProfile
    (req, res) => {
      // TODO call a function here to check to see if user exist in our database, and if not then create a new user
      console.log(req.user) // HERE IS YOUR USER DATA
      const redirect = req.session.oauth2return || '/user?';
      delete req.session.oauth2return;
      res.redirect(redirect + `user_id=${req.user.id}`);
    }
  );
  // redirect route for when facebook sucessfully authenticates user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook',  { failureRedirect: '/loginError' }),
    (req,res) => {
    console.log(req) //HERE IS YOUR USER DATA
      const redirect = req.session.oauth2return || '/user?';
      delete req.session.oauth2return;
      res.redirect(redirect + `user_id=${req.user.id}`)
    }
  )

  app.get('/loginError', (req,res) => {
    res.redirect('http://localhost:8080/')


  })


     /* , { successRedirect: '/',
      failureRedirect: '/login' }))*/

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });



  // Update
  app.put('/auth/login/email', function(req, res) {
    const jsonData = req.body.params;

    var update =
    {
      role: jsonData.role,
      password: jsonData.password
    };

    if (jsonData["collection"] === constants.USERS) {
      userAuth.findByIdAndUpdate(jsonData.id, update, (err, result) => Utils.putCallback(res, err, result));
    } else if (jsonData["collection"] === constants.STORES) {
      storeAuth.findByIdAndUpdate(jsonData.id, update, (err, result) => Utils.putCallback(res, err, result));
    }
  });

  // delete
  app.delete('/auth', function(req, res) {
    const jsonData = req.body;

    if (jsonData["collection"] === constants.USERS) {
      userAuth.findByIdAndDelete(jsonData.id, (err, result) => Utils.callBack(res, err, result));
    } else if (jsonData["collection"] === constants.STORES) {
      storeAuth.findByIdAndDelete(jsonData.id, (err, result) => Utils.callBack(res, err, result));
    }
  });
};
