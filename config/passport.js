const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb){
  User.findOne({id}, function(err, users) {
    cb(err, users);
  });
});

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET
  },
  function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return User.findOne({ id : jwtPayload.id })
      .then(user => {
          return cb(null, user);
      })
      .catch(err => {
          return cb(err);
      });
  }
));

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