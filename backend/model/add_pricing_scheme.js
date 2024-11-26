const addPricingSchemeSchema =
{
    title: "Add Pricing Scheme Schema",
    type: "object",
    required:["pricing_type", "rate", "order_position"],
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
        order_position: {
            type: "string",
            minLength: 1,
            maxLength: 3,
            pattern: `^[0-9]+$`
        }
    }
};

module.exports = addPricingSchemeSchema;