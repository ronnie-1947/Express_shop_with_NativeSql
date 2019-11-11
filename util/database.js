const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'express_shop',
    password: 'Ronnie@97'
});

module.exports = pool.promise();