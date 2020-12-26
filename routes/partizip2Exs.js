const express = require('express');
const router = express.Router();
const { Partizip2Ex, validatePartizip2Ex } = require('../models/partizip2Ex');

router.post('/', async (req, res) => {
    const { error } = validatePartizip2Ex(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let ex = new Partizip2Ex({
        verb: req.body.verb,
        hilfVerb: req.body.hilfVerb,
        partizip2: req.body.partizip2,
        level: req.body.level
    });

    ex = await ex.save();
    res.send(ex);
});

module.exports = router;