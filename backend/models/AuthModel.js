let mongoose = require("mongoose");

let authSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("Auth", authSchema);
