const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./setup/myurl").dbUrl;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("connected to database successfully!!!"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("app is listening at port 5000..."));
