const express = require("express")
const router = express.Router()
const User = require("../models/user")
// 驗證登入狀態
const passport = require("passport")
// 將密碼雜湊 
const bcrypt = require("bcryptjs")

router.get("/login", (req, res) => {
  res.render("login")
})

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login"
  })(req, res, next)

})

router.get("/register", (req, res) => {
  res.render("register")
})

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body

  // 加入錯誤訊息提示
  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ messages: '所有欄位都是必填' })
  }

  if (password !== password2) {
    errors.push({ messages: '密碼輸入錯誤' })
  }

  if (errors.length > 0) {
    res.render("register", { errors, name, email, password, password2 })
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        console.log("This email already register!!")
        res.render("register", {
          name,
          email,
          password,
          password2,
        })
      } else {
        const newUser = new User({
          name,
          email,
          password,
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then(user => {
                res.redirect("/")
              })
              .catch(err => console.log(err))
          })
        })
      }
    })
  }


})

router.get("/logout", (req, res) => {
  req.logout()
  req.flash("success_msg", "你已經成功登出！！")
  res.redirect("/users/login")
})

module.exports = router