const express = require("express")
const router = express.Router()
const Record = require("../models/record")
const { authenticated } = require("../config/auth")

// 首頁
router.get("/", authenticated, (req, res) => {
  // 找出database所有種子資料放進records參數
  Record
    .find({ userId: req.user._id })
    .sort({ name: "asc" })
    .exec((err, records) => {
      if (err) return console.error(err)
      // 總金額
      let totalMoney = 0
      if (records.length > 0) {
        totalMoney = records.map(records => records.money).reduce((a, b) => a + b)
      }

      return res.render("index", { records: records, totalMoney: totalMoney })
    })
})

module.exports = router