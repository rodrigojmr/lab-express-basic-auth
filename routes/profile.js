const { Router } = require('express');
const router = Router();
const routeAuthenticationGuard = require('./../middleware/authGuard');
const User = require('../models/user');

router.get('/', routeAuthenticationGuard, (req, res, next) => {
  res.render('profile/show');
});

router.get('/edit', routeAuthenticationGuard, (req, res, next) => {
  res.render('profile/edit');
});

router.post('/edit', routeAuthenticationGuard, (req, res, next) => {
  const { name } = req.body;

  User.findByIdAndUpdate(req.session.userId, { name: name })
    .then(user => {
      user.save();
    })
    .then(() => {
      res.redirect('/profile');
    });
});

module.exports = router;
