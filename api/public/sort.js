const express = require("express");
const router = express.Router();
const Movies = require("../../models/Movies");

//@type   GET
//@route  /api/sort/released
//@desc   route for fetching all movies released after
//@access PUBLIC
router.get("/released", (req, res) => {
  Movies.aggregate([
    {
      $match: {
        year: {
          $gte: req.body.year
        }
      }
    }
  ])
    .then(movies => {
      if (movies.length == 0) {
        res.send("No movie found!!!");
      } else res.json(movies);
    })
    .catch(err => console.log(err));
});

//@type   GET
//@route  /api/sort/rating
//@desc   route for fetching all movies rating greater than
//@access PUBLIC
router.get("/rating", (req, res) => {
  Movies.aggregate([
    {
      $match: {
        "imdb.rating": {
          $gte: req.body.rating
        }
      }
    }
  ])
    .then(movies => {
      if (movies.length == 0) {
        res.send("No movie found!!!");
      } else res.json(movies);
    })
    .catch(err => console.log(err));
});

module.exports = router;
