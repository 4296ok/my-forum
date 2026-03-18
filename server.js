const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static('public'));

// Get post
app.get('/post', (req, res) => {
    fs.readFile('post.txt', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Cannot read post.');
        res.send({ content: data });
    });
});

// Get comments
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) return res.json([]);
        res.json(JSON.parse(data));
    });
});

// Add comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    fs.readFile('comments.json', 'utf8', (err, data) => {
        let comments = [];
        if (!err) comments = JSON.parse(data);
        comments.push(comment);
        fs.writeFile('comments.json', JSON.stringify(comments, null, 2), err => {
            if (err) return res.status(500).send('Cannot save comment.');
            res.json(comment);
        });
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));