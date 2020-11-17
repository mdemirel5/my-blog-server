const mongoose = require('mongoose');
const express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
const config = require('config');

let database = require('./database/db');
const app = express();
const blogs = require('./routes/blogs');
const users = require('./routes/users');
const auth = require('./routes/auth');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(console.log('connected to mongoDb successfully', database.db))
    .catch('could not connect to mongoDb');

app.use(express.json());
app.use(cors());
app.use('/blogs', blogs);
app.use('/api/users', users);
app.use('/api/auth', auth);
require('./prod')(app);
const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log(`the app is open on port ${port}`));

module.exports = server;
