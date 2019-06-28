const mongoose = require("mongoose");
const schema = mongoose.Schema;

const MovieSchema = new schema({
  title: {
    type: String
  },
  year: {
    type: Number
  },
  runtime: {
    type: String
  },
  metacritic: {
    type: String
  },
  poster: {
    type: String
  },
  plot: {
    type: String
  },
  awards: {
    type: String
  },
  type: {
    type: String
  },
  directors: [],
  actors: [],
  writers: [],
  genres: [],
  languages: [],
  countries: [],
  fullPlot: {
    type: String
  },
  rated: {
    type: String
  },
  released: {
    type: Date
  },
  imdb: {
    id: {
      type: Number
    },
    rating: {
      type: Number
    },
    voting: {
      type: Number
    }
  },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = Movies = mongoose.model(
  "movies_scratch",
  MovieSchema,
  "movies_scratch"
);
