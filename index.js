require("dotenv").config();
require("./mongo");

const express = require("express");
const cors = require("cors");
const { application } = require("express");
const studentRouter = require("./controllers/userController");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.use("/api/user", studentRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
