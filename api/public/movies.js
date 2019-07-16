const express = require("express");
const router = express.Router();
const Movies = require("../../models/Movies");
const PromoMovies = require("../../models/PromoMovies");

//@type   GET
//@route  /api/movies/find
//@desc   route for fetching all movies
//@access PUBLIC
router.get("/", (req, res) => {
  PromoMovies.find().then(movies => {
    var promomovie = [];
    for(let i=0;i<20;i++){
      promomovie[i] = movies[i];
    }
    res.render("index.ejs", { promomovie });
  });
});

//@type   GET
//@route  /api/movies/:id
//@desc   route for fetching a movie by id
//@access PUBLIC
router.get("/:id", (req, res) => {
  Movies.find({ _id: req.params.id })
    .then(movie => {
      var doc = {
        title: movie[0].title,
        poster_path: movie[0].poster_path,
        genres: movie[0].genres,
        spoken_languages: movie[0].spoken_languages,
        imdb_id: movie[0].imdb_id
      };
      PromoMovies.create(doc)
        .then("document saved!!!")
        .catch(err => console.log(err));
      res.json(doc);
    })
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
  ])
    .then(movies => {
      if (movies.length == 0) {
        res.status(404).send("please enter correct genre!!!");
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
  ])
    .then(movies => {
      if (movies.length == 0) {
        res.status(404).send("please enter correct language!!!");
      } else {
        res.json(movies);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

module.exports = router;
