require('dotenv').config();

const { Pool } = require('pg');
const db_config = require('./config/db.config');

const pool = new Pool({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database,
    port: db_config.port
});

pool.query('SELECT * FROM pricing_scheme', (err, res) => {
    if (err) {
        console.error('Query Error:', err);
    } else {
        console.log('Table:', res.rows);
    }

    pool.end();
});
