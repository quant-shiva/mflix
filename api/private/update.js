const express = require("express");
const router = express.Router();
const Movies = require("../../models/Movies");
const PromoMovies = require("../../models/PromoMovies");

//@type   POST
//@route  /api/update
//@desc   route for updating movie data
//@access PRIVATE
router.post("/", (req, res) => {
  updated_doc = {};
  if (req.body.title) updated_doc.title = req.body.title;
  if (req.body.year) updated_doc.year = req.body.year;
  if (req.body.runtime) updated_doc.runtime = req.body.runtime;
  if (req.body.metacritic) updated_doc.metacritic = req.body.metacritic;
  if (req.body.poster) updated_doc.poster = req.body.poster;
  if (req.body.plot) updated_doc.plot = req.body.plot;
  if (req.body.awards) updated_doc.awards = req.body.awards;
  if (req.body.type) updated_doc.type = req.body.type;
  if (req.body.directors) updated_doc.directors = req.body.directors;
  if (req.body.actors) updated_doc.actors = req.body.actors;
  if (req.body.writers) updated_doc.writers = req.body.writers;
  if (req.body.genres) updated_doc.genres = req.body.genres;
  if (req.body.languages) updated_doc.languages = req.body.languages;
  if (req.body.countries) updated_doc.countries = req.body.countries;
  if (req.body.fullPlot) updated_doc.fullPlot = req.body.fullPlot;
  if (req.body.rated) updated_doc.rated = req.body.rated;
  if (req.body.released) updated_doc.released = req.body.released;
  updated_doc.lastUpdated = Date.now();
  if (req.body.imdb) {
    if (req.body.fullPlot) updated_doc.fullPlot = req.body.fullPlot;
    if (req.body.imdb.id) updated_doc.imdb.id = req.body.imdb.id;
    if (req.body.imdb.rating) updated_doc.imdb.rating = req.body.imdb.rating;
    if (req.body.imdb.votes) updated_doc.imdb.votes = req.body.imdb.votes;
  }

  Movies.findByIdAndUpdate(req.body.id, updated_doc, { new: true })
    .then(movie => res.json(movie))
    .catch(err => console.log(err));
  console.log(req.body);
});

//@type   POST
//@route  /api/update/new
//@desc   route for adding new movie to list
//@access PRIVATE
router.post("/new", (req, res) => {
  const new_movie = new Movies({
    title: req.body.title,
    year: req.body.year,
    runtime: req.body.runtime,
    metacritic: req.body.metacritic,
    poster: req.body.poster,
    plot: req.body.plot,
    awards: req.body.awards,
    type: req.body.type,
    directors: req.body.directors,
    actors: req.body.actors,
    writers: req.body.writers,
    genres: req.body.genres,
    languages: req.body.languages,
    countries: req.body.countries,
    fullPlot: req.body.fullPlot,
    rated: req.body.rated,
    released: req.body.released,
    lastUpdated: Date.now(),
    imdb: req.body.imdb
  });
  new_movie
    .save()
    .then(movie => res.json(movie))
    .catch(err => console.log(err));
});

//@type   POST
//@route  /api/update/promo
//@desc   route for adding new movie to list
//@access PRIVATE
router.post("/promo", (req, res) => {
  const new_promo_movie = new PromoMovies({
    title: req.body.title,
    year: req.body.year,
    runtime: req.body.runtime,
    metacritic: req.body.metacritic,
    poster: req.body.poster,
    plot: req.body.plot,
    awards: req.body.awards,
    type: req.body.type,
    directors: req.body.directors,
    actors: req.body.actors,
    writers: req.body.writers,
    genres: req.body.genres,
    languages: req.body.languages,
    countries: req.body.countries,
    fullPlot: req.body.fullPlot,
    rated: req.body.rated,
    released: req.body.released,
    lastUpdated: Date.now(),
    imdb: {
      id: req.body.imdb.id,
      rating: req.body.imdb.rating,
      votes: req.body.imdb.votes
    }
  });
  new_promo_movie
    .save()
    .then(movie => res.json(movie))
    .catch(err => console.log(err));
});

module.exports = router;
