// 查看是不是已經登入狀態（套用在路由）
module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash("warning_msg", "請先登入才能使用")
    return res.redirect("/users/login")
  }
}
