const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Blog, validateBlog } = require('../models/blog');
const auth = require('../middleware/auth');


router.get('/', async (req, res) => {
    const blogs = await Blog.find().sort({ name: 1 });
    res.send(blogs);
});

router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('No blog with the given ID')
    res.send(blog);
});

router.post('/', async (req, res) => {
    const { error } = validateBlog(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let blog = new Blog({
        title: req.body.title,
        content: req.body.content
    });

    blog = await blog.save();
    res.send(blog);
});

router.put('/:id', auth, async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content
    }, { new: true });

    if (!blog) return res.status(404).send('No blog with the given ID');
    res.send(blog);
});

router.delete('/:id', auth, async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) return res.status(404).send('no blog with the given ID');

    res.send(blog);
});

module.exports = router;