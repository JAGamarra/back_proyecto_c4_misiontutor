const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

/* 
  Esquema de los usuarios
*/

const userSchema = Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  passwordHashed: {
    type: String,
    require: true,
  },
  cellphoneNumber: {
    type: String,
    require: true,
  },
  birthday: {
    type: Date,
  },
  rol: {
    type: String,
    require: true,
  },
  assignature: {
    type: String,
  },
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHashed;
  },
});

const User = model("user", userSchema);

module.exports = User;
