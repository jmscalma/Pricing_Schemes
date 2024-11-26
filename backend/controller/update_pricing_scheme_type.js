const { Pool } = require('pg')
const db_config = require('../config/db.config')

const pool = new Pool({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database,
    port: db_config.port
});

const handler = (req, res) => {
    const { pricing_scheme_id, new_pricing_type } = req.query;

    const query = `SELECT * FROM update_pricing_scheme_type('${pricing_scheme_id}', '${new_pricing_type}');`

    pool.query(query, (err, results) => {
        if(err){
            res.status(500).send({message: 'Something went wrong.', err})
        }else{
            res.status(200).send({message: 'Scheme type updated successfully.', pricing_schemes: results.rows})
        }
    })

}

module.exports = handler