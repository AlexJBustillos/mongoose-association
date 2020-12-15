const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    header: String,
    content: String,
    date: Date
});

const blogPostSchema = new mongoose.Schema({
    title: String,
    body: String,
    comments: [commentSchema]
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;