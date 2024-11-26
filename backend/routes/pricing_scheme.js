const express = require('express')
const router = express.Router()

const validator = require('../middleware/validator')

// controllers
const addPricingSchemeController = require('../controller/add_pricing_scheme')
const getAllPricingSchemesController = require('../controller/get_all_pricing_schemes')
const updatePricingSchemePositionController = require('../controller/update_pricing_scheme_position')
const deletePricingSchemeController = require('../controller/delete_pricing_scheme')
const updatePricingSchemeController = require('../controller/update_pricing_scheme')

// models
const addPricingSchemeSchema = require('../model/add_pricing_scheme')
const updatePricingSchemePositionSchema = require('../model/update_pricing_scheme_position')
const deletePricingSchemeSchema = require('../model/delete_pricing_scheme')
const updatePricingSchemeSchema = require('../model/update_pricing_scheme')

router.route('/pricing-scheme/add')
.post(validator.validate({body: addPricingSchemeSchema}), (req, res) => {
    addPricingSchemeController(req, res);
})

router.route('/pricing-scheme/all')
.get((req, res) => {
    getAllPricingSchemesController.getAllPricingSchemes(req, res);
})

router.route('/pricing-scheme/update/position')
.patch((req, res) => {
    updatePricingSchemePositionController(req, res);
})

router.route('/pricing-scheme/delete')
.delete(validator.validate({query: deletePricingSchemeSchema}), (req, res) => {
    deletePricingSchemeController(req, res);
})

router.route('/pricing-scheme/update')
.patch(validator.validate({body: updatePricingSchemeSchema}), (req, res) => {
    updatePricingSchemeController(req, res);
})

module.exports = router