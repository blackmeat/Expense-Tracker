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
  res.send("HI")
})


// 設置監聽啟動伺服器
app.listen(port, () => {
  console.log("App is running!!")
})