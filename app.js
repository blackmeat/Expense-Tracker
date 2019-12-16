// 載入express模組
const express = require("express")
const app = express()
const port = 3000
// 載入mongoose模組
const mongoose = require("mongoose")
// 設定好models/account.js後載入
const Record = require("./models/record")
// 載入handlebars模組
const exhbs = require("express-handlebars")

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


// 路由設定
app.get("/", (req, res) => {
  Record.find((err, records) => {
    if (err) return console.error(err)
    return res.render("index", { records: records })
  })
})

app.get("/records", (req, res) => {
  res.render("/")
})
app.get("/records/:id/edit", (req, res) => {
  res.send("修改頁面")
})
app.post("/records/:id", (req, res) => {
  res.send("修改完成送出")
})
app.get("/records/new", (req, res) => {
  res.send("新增支出項目頁面")
})
app.post("/records", (req, res) => {
  res.send("新增項目送出")
})
app.post("/records/:id/delete", (req, res) => {
  res.send("刪除支出項目")
})


// 設置監聽啟動伺服器
app.listen(port, () => {
  console.log("App is running!!")
})