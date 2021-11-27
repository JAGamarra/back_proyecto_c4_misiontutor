const bcrypt = require("bcrypt");
const studentRouter = require("express").Router();
const Student = require("../models/Student");

studentRouter.post("/", async (req, res) => {});

module.exports = studentRouter;
