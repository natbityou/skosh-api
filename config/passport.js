const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb){
  User.findOne({id}, function(err, users) {
    cb(err, users);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, cb){
    User.findOne({email: email}, function(err, user){
      if (err) return cb(err);
      if (!user) return cb(null, false, { message: 'Email not found' });

    bcrypt.compare(password, user.password, function(err, res){
      if (!res) return cb(null, false, { message: 'Invalid Password' });

      return cb(null, user);
    });
  });
}));