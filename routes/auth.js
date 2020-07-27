const { Router } = require('express');
const router = Router();

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const User = require('../models/user');

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  const { name, password } = req.body;
  bcrypt
    .hash(password, saltRounds)
    .then(hashAndSalt => {
      return User.create({
        username: name,
        passwordHashAndSalt: hashAndSalt
      });
    })
    .then(user => {
      res.redirect('/auth/signin');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/signin', (req, res, next) => {
  res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
  const { name, password } = req.body;

  let user;

  User.findOne({ username: name })
    .then(document => {
      user = document;
      if (!user) {
        return Promise.reject(new Error('No user with that name'));
      }
      const passwordHashAndSalt = user.passwordHashAndSalt;
      return bcrypt.compare(password, passwordHashAndSalt);
    })
    .then(comparison => {
      if (comparison) {
        req.session.userId = user._id;
        res.redirect('/main');
      } else {
        const error = new Error('Password did not match');
        return Promise.reject(error);
      }
    })
    .catch(error => {
      res.render('auth/signin', { error: error });
    });
});

router.get('/signin', (req, res, next) => {
  res.render('auth/signin');
});

router.post('/logout', (request, response) => {
  request.session.destroy();
  response.redirect('/');
});

module.exports = router;
