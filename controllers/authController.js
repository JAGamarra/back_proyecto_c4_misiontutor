const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRouter = require("express").Router();
const User = require("../models/UserModel");

/**
 * Para el login se debe enviar una petición POST al endpoint /api/auth/login
 * con el email y password como campos requeridos en el cuerpo de la petición
 *
 * Para el registro se debe enviar una petición POST al endpoint /api/auth/register
 * con los campos: firstName, lastName, email, password, cellphoneNumber, birthday, rol
 * SI el rol es profesor se debe enviar la materia que dicta en el campo assignature
 */

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHashed);

  if (!passwordCorrect || !user) {
    return res.status(401).json({
      error: "invalid password or email",
    });
  }

  const token = jwt.sign(
    {
      user,
    },
    process.env.SECRET
  );
  res.status(202).header("auth-token", token).json({
    error: null,
    data: token,
  });
});

authRouter.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    cellphoneNumber,
    birthday,
    rol,
    assignature,
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
      assignature,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(409).send(err);
  }
});

module.exports = authRouter;
