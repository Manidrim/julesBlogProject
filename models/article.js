const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
