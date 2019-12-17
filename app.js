// 載入express模組
const express = require("express")
const app = express()
const port = 3000
// 載入mongoose模組 (與資料庫連結)
const mongoose = require("mongoose")
// 設定好models/account.js後載入
const Record = require("./models/record")
// 載入handlebars模組（模板）
const exhbs = require("express-handlebars")
// 載入body-parser模組 (取得表單送出內容)
const bodyParser = require("body-parser")
// 載入method-override模組（符合RESTful路由)
const methodOverride = require("method-override")

// mongoose 連線設定
mongoose.connect("mongodb://localhost/record", { useNewUrlParser: true })
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


// 路由設定
app.use("/", require("./routes/home"))
app.use("/records", require("./routes/record"))





// 設置監聽啟動伺服器
app.listen(port, () => {
  console.log("App is running!!")
})