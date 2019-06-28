const express = require("express");
const router = express.Router();
const Movies = require("../../models/Movies");

//@type   GET
//@route  /api/movies
//@desc   route for fetching all movies
//@access PUBLIC
router.get("/", (req, res) => {
  Movies.find()
    .then(movies => {
      if (movies.length == 0) {
        res.status(500).end();
      } else {
        res.json(movies);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

//@type   GET
//@route  /api/movies/:id
//@desc   route for fetching a movie by id
//@access PUBLIC
router.get("/:id", (req, res) => {
  Movies.find({ _id: req.params.id })
    .then(movie => res.json(movie))
    .catch(err => console.log(err));
});

//@type   GET
//@route  /api/movies/title/:movie_name
//@desc   route for fetching movie by name
//@access PUBLIC
router.get("/title/:movie_name", (req, res) => {
  let query = RegExp(req.params.movie_name, "i");
  Movies.find({ title: { $regex: query } })
    .then(movie => {
      if (movie.length == 0) {
        res.status(404).send("movie not found!!!");
      } else res.json(movie);
    })
    .catch(err => {
      res.status(500).end();
      console.log(err);
    });
});


//@type   GET
//@route  /api/movies/genre/:genre
//@desc   route for fetching movies by genre
//@access PUBLIC
router.get("/genre/:genre", (req, res) => {
  let query = req.params.genre[0].toUpperCase() + req.params.genre.slice(1);
  Movies.aggregate([
    {
      $match: {
        genres: {
          $in: [query, "$genres"]
        }
      }
    }
  ]).then(movies => {
      if(movies.length==0){
          res.status(404).send("please enter correct genre!!!")
      }
      else{
          res.json(movies)
      }
     })
     .catch(err=>{
         console.log(err);
         res.status(500).end();
     })
});


//@type   GET
//@route  /api/movies/language/:language
//@desc   route for fetching movies by genre
//@access PUBLIC
router.get("/language/:lang", (req, res) => {
    let query = req.params.lang[0].toUpperCase() + req.params.lang.slice(1);
    Movies.aggregate([
        {
            $match: {
                languages: {
                    $in: [query, "$languages"]
                }
            }
        }
    ]).then(movies => {
        if (movies.length == 0) {
            res.status(404).send("please enter correct language!!!")
        }
        else {
            res.json(movies)
        }
    })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
});

module.exports = router;
