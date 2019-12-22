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
      return res.render("index", { records: records })
    })
})

module.exports = router