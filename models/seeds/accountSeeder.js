const mongoose = require("mongoose")
const Account = require("../account")

mongoose.connect("mongodb://localhost/account", { useNewUrlParser: true })
const db = mongoose.connection

db.on("error", () => {
  console.log("Conncet error!!!")
})

db.once("open", () => {
  console.log("Connect success!!!")

  for (let i = 1; i < 6; i++) {
    Account.create({
      name: "food-" + i,
      category: "食物",
      money: 50,
    })
  }
  console.log("done")
})

