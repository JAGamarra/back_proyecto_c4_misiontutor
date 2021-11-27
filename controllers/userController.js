const bcrypt = require("bcrypt");
const { response } = require("express");
const userRouter = require("express").Router();
const User = require("../models/UserModel");

userRouter.get("/:rol", async (req, res) => {
  const rol = req.params.rol;
  try {
    const usersByRol = await User.find({ rol });
    res.status(200).json(usersByRol);
  } catch (err) {
    res.status(400).json(err);
  }
});

userRouter.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    cellphoneNumber,
    birthday,
    rol,
  } = req.body;
  const saltRounds = 10;

  try {
    const passwordHashed = await bcrypt.hash(password, saltRounds);

    const user = new User({
      firstName,
      lastName,
      email,
      passwordHashed,
      birthday,
      cellphoneNumber,
      rol,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(409).send(err);
  }
});

module.exports = userRouter;
