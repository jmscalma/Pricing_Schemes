const { Pool } = require('pg')
const db_config = require('../config/db.config')

const pool = new Pool({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database,
    port: db_config.port
});

const handler = async (req, res) => {
    const reordered_pricing_schemes = req.body.reordered_pricing_schemes;
  
    if (!Array.isArray(reordered_pricing_schemes)) {
      return res.status(400).send({ message: 'Invalid input format.' });
    }
  
    const results = [];
    try {
      for (let i = 0; i < reordered_pricing_schemes.length; i++) {
        let pricing_scheme_id = reordered_pricing_schemes[i].price_scheme_id;
        let new_order_position = reordered_pricing_schemes[i].new_order_position;
  
        const query = `SELECT * FROM update_pricing_scheme_position('${pricing_scheme_id}', ${new_order_position});`;
  
        const dbResult = await pool.query(query);
        results.push(dbResult.rows);
      }
  
      res.status(200).send({
        message: 'Pricing scheme positions updated successfully.',
        pricing_schemes: results,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Something went wrong.', error: err });
    }
  };
  

module.exports = handler