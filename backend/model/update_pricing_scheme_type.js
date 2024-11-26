const updatePricingSchemeTypeSchema =
{
    title: "Update Pricing Scheme Type Schema",
    type: "object",
    required:["pricing_scheme_id", "new_pricing_type"],
    properties: {
        pricing_scheme_id: {
            type: "string",
            minLength: 1,
            maxLength: 5,
            pattern: `^[0-9]+$`
        },
        new_pricing_type: {
            type: "string",
            minLength: 5,
            maxLength: 8,
            pattern: `^(Fixed|Variable)$`
        }
    }
};

module.exports = updatePricingSchemeTypeSchema;