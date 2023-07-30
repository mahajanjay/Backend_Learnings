const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  userId: {
    type: Number,
    min: [0, "userId should be positive"],
    max: [20, "userId should be less than 20"],
    unique: true
  },
  title: { type: String, require: true },
  body: String,
});

exports.Post = mongoose.model("Post", postSchema);
