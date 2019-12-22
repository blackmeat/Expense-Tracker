// 載入express模組
const express = require("express")
const app = express()
const port = 3000
// 載入mongoose模組 (與資料庫連結)
const mongoose = require("mongoose")
// 設定好Schema後載入
const Record = require("./models/record")
// 載入handlebars模組（template模板）
const exhbs = require("express-handlebars")
// 載入body-parser模組 (取得表單送出內容)
const bodyParser = require("body-parser")
// 載入method-override模組（符合RESTful路由)
const methodOverride = require("method-override")
// 載入session模組 （session & cookie）
const session = require("express-session")
// 載入passport模組 （登入驗證）
const passport = require("passport")


// mongoose 連線設定
mongoose.connect("mongodb://localhost/record", { useNewUrlParser: true, useCreateIndex: true })
// 連結mongodb後，透過mongoose.connection取得Connection物件
const db = mongoose.connection
// 連結異常
db.on("error", () => {
  console.log("Connect error!!")
})
// 連結成功
db.once("open", () => {
  console.log("Connect success!!")
})

// handlebars 設定
app.engine("handlebars", exhbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

// body-parser 設定
app.use(bodyParser.urlencoded({ extended: true }))

// method-override 設定
app.use(methodOverride("_method"))

// session 設定
app.use(session({
  secret: "12345",
  resave: false,
  saveUninitialized: true
}))

// passport 設定
app.use(passport.initialize())
app.use(passport.session())
require("./config/passport")(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})


// 路由設定
app.use("/", require("./routes/home"))
app.use("/records", require("./routes/record"))
app.use("/users", require("./routes/user"))



// 設置監聽啟動伺服器
app.listen(port, () => {
  console.log("App is running!!")
})