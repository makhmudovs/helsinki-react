const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, unqiue: true, required: true, minlength: 4 },
    born: Number,
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("Author", authorSchema);
