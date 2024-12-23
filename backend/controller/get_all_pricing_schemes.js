const { Pool } = require('pg')
const db_config = require('../config/db.config')

const pool = new Pool({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database,
    port: db_config.port
});

exports.getAllPricingSchemes = (req, res) => {
    const query = `SELECT * FROM get_all_pricing_scheme();`

    pool.query(query, (err, results) => {
        if(err){
            res.status(500).send({message: 'Something went wrong.'})
        }else{
            res.status(200).send({message: 'Pricing schemes fetched successfully.', pricing_schemes: results.rows})
        }
    })
}