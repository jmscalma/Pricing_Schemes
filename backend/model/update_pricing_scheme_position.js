const updatePricingSchemePositionSchema =
{
    title: "Update Pricing Scheme Position Schema",
    type: "object",
    required:["pricing_scheme_id", "new_order_position"],
    properties: {
        pricing_scheme_id: {
            type: "string",
            minLength: 1,
            maxLength: 5,
            pattern: `^[0-9]+$`
        },
        new_order_position: {
            type: "string",
            minLength: 1,
            maxLength: 3,
            pattern: `^[0-9]+$`
        }
    }
};

module.exports = updatePricingSchemePositionSchema;