const passport = require('passport');

module.exports = async function (req, res, proceed) {
  passport.authenticate('jwt', {session: false})(req, res, proceed)
};