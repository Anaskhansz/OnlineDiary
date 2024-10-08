require("dotenv").config();
require("./config/DbConnect");
let express = require("express");
let path = require("path");
let cors = require("cors");
let app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "./uploads")));

app.use("/", require("./routes/TodoRoutes"));
app.use("/auth", require("./routes/AuthRoutes"));
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
