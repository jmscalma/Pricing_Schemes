const deletePricingSchemeSchema =
{
    title: "Update Pricing Scheme Position Schema",
    type: "object",
    required:["pricing_scheme_id"],
    properties: {
        pricing_scheme_id: {
            type: "string",
            minLength: 1,
            maxLength: 5,
            pattern: `^[0-9]+$`
        }
    }
};

module.exports = deletePricingSchemeSchema;