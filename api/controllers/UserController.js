/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs');

module.exports = {
  register: async function (req, res) {

    req.file('avatar').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000
    }, async function (err, uploadedFiles) {
      if (err) return res.serverError(err);
  
      // If no avatar was uploaded, respond with an error.
      if (uploadedFiles.length === 0) {
        return res.badRequest('Missing avatar for User');
      }

      fs.readFile(uploadedFiles[0]['fd'], async function read(err, data) {
        if (err) return res.serverError(err);

        await User.create({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          avatar: data,
        });

        return res.ok();
      });
    });
  },
};


