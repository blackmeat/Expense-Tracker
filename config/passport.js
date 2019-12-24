const LocalStrategy = require("passport-local").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require("mongoose")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

module.exports = passport => {
  // password-local
  passport.use(new LocalStrategy
    ({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email }).then(user => {
        if (!user) {
          return done(null, false, { message: "The email isn't register!!" })
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, { message: "email or password incorrect!!" })
          }
        })
      })
    })
  )
  // password-facebook
  passport.use(
    new FacebookStrategy({
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      profileFields: ["email", "displayName"]
    }, (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile._json.email }).then(user => {
        if (!user) {
          let passwordRandom = Math.random().toString(36).slice(-8)
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(passwordRandom, salt, (err, hash) => {
              let newUser = new User({
                name: profile._json.name,
                email: profile._json.email,
                password: hash
              })
              newUser.save().then(user => {
                return done(null, user)
              })
            })
          })
        } else {
          return done(null, user)
        }
      })
    })
  )
  /*
  // google
  passport.use(
    new GoogleStrategy(
      {
        clientID: "879798476387-66p53qdm4tg6p4d75jv7o32mh7sepij2.apps.googleusercontent.com",
        clientSecret: "kqZusT7i6dNCtLpnIiOuQf0A",
        callbackURL: "http:/localhost:3000/auth/google/callback"
      }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ email: profile._json.email }).then(user => {
          if (!user) {
            let passwordRandom = Math.random().toString(36).slice(-8)
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(passwordRandom, salt, (err, hash) => {
                let newUser = new User({
                  name: profile._json.name,
                  email: profile._json.email,
                  password: hash
                })
                newUser.save().then(user => {
                  return done(null, user)
                })
              })
            })
          } else {
            return done(null, user)
          }
        })
      })
  )
  */

  // Session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(null, user)
    })
  })

}

