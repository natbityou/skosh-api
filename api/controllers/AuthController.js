/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {
  login: function(req, res) {
    passport.authenticate('local', function(err, user, info){
      if (err) {
        return res.send(err);
      }

      if (!user) {
        return res.status(400).send({
          message: info.message
        });
      }

      req.login(user, function(err) {
        if (err) return res.status(404).send(err);

        return res.send({
          user
        });
      });
    })(req, res);
  },
  logout: function(req, res) {
      req.logout();

      return res.ok();
  }
};


