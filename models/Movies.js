const mongoose = require("mongoose");
const schema = mongoose.Schema;

const MovieSchema = new schema({
  adult: {
    type: String
  },
  belongs_to_collection: [],
  budget: {
    type: String
  },
  genres: [],
  homepage: {
    type: String
  },
  id: {
    type: String
  },
  imdb_id: {
    type: String
  },
  original_language: {
    type: String
  },
  original_title: {
    type: String
  },
  overview: {
    type: String
  },
  popularity: {
    type: String
  },
  poster_path: {
    type: String
  },
  production_companies: [],
  production_countries: [],
  release_date: {
    type: String
  },
  revenue: {
    type: String
  },
  runtime: {
    type: String
  },
  spoken_languages: [],
  status: {
    type: String
  },
  tagline: {
    type: String
  },
  title: {
    type: String
  },
  video: {
    type: String
  },
  vote_average: {
    type: String
  },
  vote_count: {
    type: String
  }
});

module.exports = Movies = mongoose.model(
  "movie_list",
  MovieSchema,
  "movie_list"
);
