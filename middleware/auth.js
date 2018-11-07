// const jwt = require('jsonwebtoken');
// const config = require('config');

// module.exports = function (req, res, next) {
//   const token = req.header('x-auth-token');
//   if (!token) return res.status(401).send('Access denied. No token provided.');

//   jwt.verify(token, config.get('jwtPrivateKey'), (error, decoded) => {
//       if(error) {
//         res.status(400).send('Invalid token.');
//       }

//       req.user = decoded;
//       next();
//   });
// }

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../startup/dbconnection").users;

const config = require("config");

// login Passport
passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        } else if (!user.validPassword(password)) {
          return done(null, false, { message: "Invalid email or password" });
        }
        // else if (!user.userVerified()) {
        //   return done(null, false, { message: "User is not verified" });
        // }

        // user.update({
        //   loginStatus: true
        // });

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Authenticate Passport
const opts = {
  jwtFromRequest: ExtractJwt.fromHeader("AuthToken"),
  secretOrKey: config.get("jwtPrivateKey")
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);

      if (!user) {
        return done(null, false);
      } else if (!user.loginStatus) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);

exports.authLocal = passport.authenticate("local", {
  session: false
});

exports.authJwt = passport.authenticate("jwt", {
  session: false
});
