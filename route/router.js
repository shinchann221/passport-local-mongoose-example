// importing modules 
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../model/user');


router.post('/signup', (req, res, next) => {
  User.register(new User({
    email: req.body.email
  }),
    req.body.password, (err, user) => {
      if (err) {
        res.status(409).json({ error: err });
        return;
      }
      else {
        res.status(201).json({ user: user });
        return;
      }
    })
});


router.post('/login', passport.authenticate('local'), (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, person) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    else {
      jwt.sign({ user: person },
        'abcd1234' /* change secret key*/,
        { expiresIn: '24h' },
        (err, token) => {
          if (err) {
            res.json({
              message: "Failed to login",
              token: null,
            });
            return;
          }
          res.status(201).json({
            success: true,
            status: 'You are successfully logged in!',
            token: token
          });
          return;
        })
    }
  })
});


router.post('/logout', (req, res, next) => {
  if (req.session) {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie('session-id');
        res.json({
          message: 'You are successfully logged out!'
        });
      }
    });
  } else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;