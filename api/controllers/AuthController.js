/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = {
  login: function(req, res) {
    passport.authenticate('local', { session: false }, function(err, user, info) {
      if (err) {
        return res.send(err);
      }

      if (!user) {
        return res.status(400).send({
          message: info.message
        });
      }

      req.login(user, { session: false }, function(err) {
        if (err) return res.status(404).send(err);

        user = _.omit(user, ['password', 'avatar', 'createdAt', 'updatedAt']);

        const token = jwt.sign(user, process.env.JWT_SECRET);
           
        return res.send({
          user,
          token
        });
      });
    })(req, res);
  },
  logout: function(req, res) {
      req.logout();

      return res.ok();
  }
};


