const User = require('./../models/user');

const deserializeUser = (req, res, next) => {
  // Make the user object available to any route handler or middleware
  // after this
  const id = req.session.userId;

  User.findById(id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(error => {
      next(error);
    });
};

module.exports = deserializeUser;
