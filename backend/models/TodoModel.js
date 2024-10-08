let mongoose = require("mongoose");

let todoSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  email: String,
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Todo", todoSchema);
