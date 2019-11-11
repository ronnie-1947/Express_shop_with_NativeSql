const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'express_shop',
    password: 'itsasecret'
});

module.exports = pool.promise();