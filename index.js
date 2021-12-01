require("dotenv").config();
require("./mongo");

const express = require("express");
const cors = require("cors");

const notFound = require("./middlewares/notFound");
const verifyToken = require("./middlewares/validateToken");

const authRouter = require("./controllers/authController");
const userRouter = require("./controllers/userController");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.use("/api/auth", authRouter);
app.use("/api/user", verifyToken, userRouter);

app.use(notFound);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
