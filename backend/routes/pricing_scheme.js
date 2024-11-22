const express = require('express')
const router = express.Router()

const validator = require('../middleware/validator')

// controllers
const addPricingSchemeController = require('../controller/add_pricing_scheme')

// models
const addPricingSchemeSchema = require('../model/add_pricing_scheme')

router.route('/pricing-scheme/add')
.post(validator.validate({body: addPricingSchemeSchema}), (req,res) => {
    addPricingSchemeController(req, res);
})

module.exports = router