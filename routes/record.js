const express = require("express")
const router = express.Router()
const Record = require("../models/record")

// 瀏覽所有支出項目
router.get("/", (req, res) => {
  res.render("/")
})

// 新增支出項目頁面
router.get("/new", (req, res) => {
  res.render("new")
})
// 新增支出項目
router.post("/", (req, res) => {
  console.log(req.body)
  const record = new Record({
    name: req.body.name,
    money: req.body.money,
    category: req.body.category,
    date: req.body.date
  })
  record.save(err => {
    if (err) return console.error(err)
    return res.redirect("/")
  })
})

// 修改支出項目頁面
router.get("/:id/edit", (req, res) => {
  Record.findById(req.params.id, (err, records) => {
    if (err) return console.error(err)
    return res.render("edit", { records: records })
  })
})
// 修改支出項目
router.put("/:id", (req, res) => {
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

// 刪除支出項目
router.delete("/:id/delete", (req, res) => {
  Record.findById(req.params.id, (err, records) => {
    if (err) return console.error(err)
    records.remove(err => {
      if (err) return console.error(err)
      return res.redirect("/")
    })
  })
})

module.exports = router