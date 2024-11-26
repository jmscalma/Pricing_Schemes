const updatePricingSchemeSchema =
{
    title: "Update Pricing Scheme  Schema",
    type: "object",
    required:["pricing_scheme_id", "pricing_type", "rate"],
    properties: {
        pricing_type: {
            type: "string",
            minLength: 5,
            maxLength: 8,
            pattern: `^(Fixed|Variable)$`
        },
        rate: {
            type: "string",
            minLength: 1,
            maxLength: 20,
            pattern: `^[0-9]+(\.[0-9]+)?$`
        },
        pricing_scheme_id: {
            type: "string",
            minLength: 1,
            maxLength: 3,
            pattern: `^[0-9]+$`
        }
    }
};

module.exports = updatePricingSchemeSchema;