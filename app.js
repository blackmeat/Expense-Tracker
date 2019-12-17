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
// 載入body-parser模組
const bodyParser = require("body-parser")

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


// 路由設定
app.get("/", (req, res) => {
  // 找出database所有種子資料放進records參數
  Record.find((err, records) => {
    if (err) return console.error(err)
    return res.render("index", { records: records })
  })
})

app.get("/records", (req, res) => {
  res.render("/")
})
app.get("/records/new", (req, res) => {
  res.render("new")
})
app.post("/records", (req, res) => {
  console.log(req.body)
  const record = new Record({
    name: req.body.name,
    money: req.body.money,
    category: req.body.category
  })
  record.save(err => {
    if (err) return console.error(err)
    return res.redirect("/")
  })

})
app.get("/records/:id/edit", (req, res) => {
  Record.findById(req.params.id, (err, records) => {
    if (err) return console.error(err)
    return res.render("edit", { records: records })
  })
})
app.post("/records/:id", (req, res) => {
  Record.findById(req.params.id, (err, records) => {
    if (err) return console.error(err)
    records.name = req.body.name
    records.money = req.body.money
    records.category = req.body.category
    records.date = req.body.date
    records.save(err => {
      if (err) return console.error(err)
      return res.redirect("/")
    })
  })
})


app.post("/records/:id/delete", (req, res) => {
  res.send("刪除支出項目")
})


// 設置監聽啟動伺服器
app.listen(port, () => {
  console.log("App is running!!")
})