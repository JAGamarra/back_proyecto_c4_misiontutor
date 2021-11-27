const { Schema, model } = require("mongoose");

const studentSchema = Schema({
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
  },
  passwordHashed: {
    type: String,
    require: true,
  },
  birthday: {
    type: Date,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
});

studentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHashed;
  },
});

const Student = model("Student", studentSchema);

module.exports = Student;
