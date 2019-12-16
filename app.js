// 載入模組
const express = require("express")
const app = express()
const port = 3000



// 路由設定
app.get("/", (req, res) => {
  res.send("HI")
})


// 設置監聽啟動伺服器
app.listen(port, () => {
  console.log("App is running!!")
})