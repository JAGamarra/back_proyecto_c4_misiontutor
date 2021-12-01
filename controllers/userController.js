const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/UserModel");

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {}
});

userRouter.get("/:rol", async (req, res) => {
  const rol = req.params.rol;
  try {
    const usersByRol = await User.find({ rol });
    res.status(200).json(usersByRol);
  } catch (err) {
    res.status(400).json(err);
  }
});

userRouter.get("/:rol/:assignature", async (req, res) => {
  const { id, assignature } = req.params;
  try {
    const usersByRol = await User.find({ $and: [{ id }, { assignature }] });
    res.status(200).json(usersByRol);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = userRouter;
