const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 3000;

const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");
const emailRoutes = require("./routes/email.js");
const mongoConnection = require("./config/db.js");

mongoConnection();

app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/email", emailRoutes);
app.use("/", authRoutes);


app.listen(port, () => {
  console.log("Server is running on  http://localhost:"+port);
});
