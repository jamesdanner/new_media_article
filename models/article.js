const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: String,
  url: String,
  cover: String,
  create_date: {
    type: Number,
    default: Date.now
  }
})

module.exports = mongoose.model('Article', articleSchema);