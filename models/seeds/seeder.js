const mongoose = require("mongoose")
const Record = require("../record")

mongoose.connect("mongodb://localhost/record", { useNewUrlParser: true })
const db = mongoose.connection

db.on("error", () => {
  console.log("Conncet error!!!")
})

db.once("open", () => {
  console.log("Connect success!!!")

  for (let i = 1; i < 6; i++) {
    Record.create({
      name: "food-" + i,
      category: "食物",
      money: 50,
    })
  }
  console.log("done")
})

