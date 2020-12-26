require('express-async-errors');
const winston = require('winston');
//require('winston-mongodb');
module.exports = function () {
    process.on('uncaughtException', ex => {
        winston.error(ex.message, ex); // to log the exeption
        process.exit(1); // 0 means succsess, anaything else is failure
    });

    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true })
    );

    /*    winston.error(ex.message, ex); // to log the exeption
       process.exit(1); // 0 means succsess, anaything else is failure */
    process.on('unhandledRejection', ex => {
        throw ex; // here we have an unhandled exception
    });


    /*     winston.add(winston.transports.MongoDB, {
            db: 'mongodb://localhost/vidly',
            level: 'info'
        }); */

    /* const p = Promise.reject(new Error('Something failed miserably')); // a rejected promise
    p.then( () => console.log('Done')); */
}


