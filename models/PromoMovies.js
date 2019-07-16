const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PromoMovieSchema = new schema({
  title: {
    type: String
  },
  poster_path: {
    type: String
  },
  genres: [],
  spoken_languages: [],
  imdb_id: {
    type: String
  },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = PromoMovies = mongoose.model(
  "promo_movie",
  PromoMovieSchema,
  "promo_movie"
);
