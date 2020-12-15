require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const BlogPost = require('./models/blog.js')

// Connect tp database
mongoose.connect(`mongodb://localhost/mongooseAssociation`)

const db = mongoose.connection;


db.once('open', () => {
    console.log(`connected to MongoDB on ${db.host}:${db.port}`);
});

db.on('error', (err) => {
    console.log('Error', err);
});

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Home route, backend')
})

app.get('/blog', (req, res) => {
    BlogPost.create({
        title: 'Mongoose for all Mongoose',
        body: 'This is a cool blog post.'
    });
    // Another way to create post and save to DB
    const post1 = new BlogPost({
        title: 'SEI 1019',
        body: 'Software engineers are cool.'
    })
    post1.save();
    res.send('Post completed')
})

app.get('/comment', (req, res) => {
    const post2 = new BlogPost({
        title: 'Cool Post',
        body: 'Let us make a cool post',
    })
    // create comment
    const myComment = {
        header: 'Cool',
        content: 'This is awesome man'
    }
    post2.comments.push(myComment)
    //Save post to db
    post2.save();
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});