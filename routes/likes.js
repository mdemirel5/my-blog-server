const express = require('express');
const router = express.Router();
const { Like, validateLike } = require('../models/like');
const auth = require('../middleware/auth');


router.get('/:postName', async (req, res) => {
    const likes = await Like.find({ postName: req.params.postName });
    res.send(likes)
});

router.post('/upLike', auth, async (req, res) => {
    const { error } = validateLike(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let variable = {
        userId: req.body.userId,
        postName: req.body.postName
    };


    // if there is already a like with the given userId and postId return
    let like = await Like.findOne(variable);
    if (like) return res.status(400).send('already a like for the given data');

    like = new Like(variable);
    //save the like information data in MongoDB

    like = await like.save();
    res.send(like);
});

router.post('/unLike', auth, async (req, res) => {
    const like = await Like.findOneAndDelete({ userId: req.body.userId, postName: req.body.postName });

    if (!like) return res.status(404).send('no like for the given data');

    res.send(like);
});

module.exports = router;