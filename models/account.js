const mongoose = require("mongoose")
const Schema = mongoose.Schema

const accountSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  money: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model("Account", accountSchema)