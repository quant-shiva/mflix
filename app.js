const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./setup/myurl").dbUrl;
const movies = require("./api/public/movies");
const update = require("./api/private/update");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose
  .connect(db, { dbName: "mflix", useNewUrlParser: true })
  .then(() => console.log("connected to database successfully!!!"))
  .catch(err => console.log(err));

app.use("/api/movies/", movies);
app.use("/api/update/", update);

app.listen(5000, () => console.log("app is listening at port 5000..."));
