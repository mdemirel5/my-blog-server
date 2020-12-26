const express = require('express');
const router = express.Router();
const { Comment, validateComment } = require('../models/comment');
const auth = require('../middleware/auth');
const { User } = require('../models/user');


router.get('/:postName', async (req, res) => {
    const comments = await Comment.find({ postName: req.params.postName });
    res.send(comments);
});

router.get('/:postName/:id', async (req, res) => {
    const comment = await Comment.find({ _id: req.params.id, postName: req.params.postName });
    if (!comment) return res.status(404).send('No comment with the given ID')
    res.send(comment);
});

router.post('/:postName', auth, async (req, res) => {
    const { error } = validateComment({ ...req.body, postName: req.params.postName });
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid user');


    let comment = new Comment({
        postName: req.params.postName,
        content: req.body.content,
        user: {
            _id: user._id,
            name: user.name
        }
    });

    comment = await comment.save();
    res.send(comment);
});

router.put('/:postName/:id', auth, async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid user');

    const comment = await Comment.findOneAndUpdate({ _id: req.params.id, postName: req.params.postName }, {
        postName: req.params.postName,
        content: req.body.content,
        user: {
            _id: user._id,
            name: user.name
        }
    }, { new: true });


    if (!comment) return res.status(404).send('No comment with the given ID');
    res.send(comment);
});

router.delete('/:postName/:id', auth, async (req, res) => {
    const comment = await Comment.findOneAndDelete({ _id: req.params.id, postName: req.params.postName });

    if (!comment) return res.status(404).send('no comment with the given ID');

    res.send(comment);
});

module.exports = router;