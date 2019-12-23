const express = require("express")
const router = express.Router()
const Record = require("../models/record")
const moment = require("moment")
const { authenticated } = require("../config/auth")

// 瀏覽所有支出項目
router.get("/", authenticated, (req, res) => {
  res.render("/")
})

// 新增支出項目頁面
router.get("/new", authenticated, (req, res) => {
  const today = moment().format('YYYY-MM-DD')
  const records = { date: today }
  res.render("new", { records: records })
})
// 新增支出項目
router.post("/", authenticated, (req, res) => {
  console.log(req.body)
  const record = new Record({
    name: req.body.name,
    money: req.body.money,
    category: req.body.category,
    date: req.body.date,
    userId: req.user._id
  })
  console.log(record)
  record.save(err => {
    if (err) return console.error(err)
    return res.redirect("/")
  })
})

// 修改支出項目頁面
router.get("/:id/edit", authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, records) => {
    if (err) return console.error(err)
    return res.render("edit", { records: records })
  })
})
// 修改支出項目
router.put("/:id", authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, records) => {
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
router.delete("/:id/delete", authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, records) => {
    if (err) return console.error(err)
    records.remove(err => {
      if (err) return console.error(err)
      return res.redirect("/")
    })
  })
})

module.exports = router