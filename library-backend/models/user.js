const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique:true,
    required: true,
    minlength: 3,
  },
  favoriteGenre: {
    type: String,
    required: true,
    maxlength: 100,
  },
});

module.exports = mongoose.model("User", schema);
