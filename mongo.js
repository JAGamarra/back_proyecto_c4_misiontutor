const mongoose = require("mongoose");

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.izyfy.mongodb.net/misionTutorDB?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(err);
  });
