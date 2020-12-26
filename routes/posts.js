const express = require('express');
const router = express.Router();

const { Post, validatePost } = require('../models/post');

router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('No post with the given Id');
    res.send(post);
});

router.post('/', async (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let post = new Post({
        name: req.body.name,
        numberOfLikes: req.body.numberOfLikes
    });

    post = await post.save();
    res.send(post);
});

router.put('/:id', async (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = await Post.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            numberOfLikes: req.body.numberOfLikes
        },
        { new: true }
    );

    if (!post) return res.status(404).send('No Post with the given id');

    res.send(post);
})

module.exports = router;