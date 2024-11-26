const updatePricingSchemeRateSchema =
{
    title: "Update Pricing Scheme Position Schema",
    type: "object",
    required:["pricing_scheme_id", "new_rate"],
    properties: {
        pricing_scheme_id: {
            type: "string",
            minLength: 1,
            maxLength: 5,
            pattern: `^[0-9]+$`
        },
        new_rate: {
            type: "string",
            minLength: 1,
            maxLength: 20,
            pattern: `^[0-9]+(\.[0-9]+)?$`
        }
    }
};

module.exports = updatePricingSchemeRateSchema;