/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    
    register: async function (req, res) { 
        await User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        return res.ok();
    },

};


