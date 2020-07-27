const { Router } = require('express');
const router = Router();
const routeAuthenticationGuard = require('./../middleware/authGuard');

router.get('/private', routeAuthenticationGuard, (req, res, next) => {
  res.render('private');
});

router.get('/main', routeAuthenticationGuard, (req, res, next) => {
  res.render('main');
});

router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
