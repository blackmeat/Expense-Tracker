// 載入express模組
const express = require("express")
const app = express()
const port = 3000
// 載入mongoose模組
const mongoose = require("mongoose")
// 設定好models/account.js後載入
const Record = require("./models/record")

// mongoose 連線設定
mongoose.connect("mongodb://localhost/account", { useNewUrlParser: true })
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


// 路由設定
app.get("/", (req, res) => {
  res.send("首頁")
})
app.get("/records", (req, res) => {
  res.send("瀏覽所有支出紀錄")
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