require("dotenv").config();
let mongoose = require("mongoose");
let connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

connectDb();
