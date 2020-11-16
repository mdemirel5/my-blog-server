const config = require('config');
module.exports = {
    db: config.get('db')
};