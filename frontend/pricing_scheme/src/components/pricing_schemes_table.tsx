import React from 'react';

interface PricingScheme {
  pricing_scheme_id: number;
  pricing_type: string;
  rate: string;
  order_position: number;
}

const PricingSchemesTable = ({ pricingSchemes }: { pricingSchemes: PricingScheme[] }) => {
    console.log('Tableee', pricingSchemes)
  return (
    <table className="pricing_table">
      <thead>
        <tr>
          <th>Order</th>
          <th>Pricing Scheme</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {pricingSchemes.map((scheme) => (
          <tr key={scheme.pricing_scheme_id}>
            <td>{scheme.order_position}</td>
            {/* <td>{scheme.pricing_type}</td> */}
            <td>{scheme.pricing_type === 'Fixed' ? `Fixed Pricing` : `Variable-based`}</td>
            <td>{scheme.pricing_type === 'Fixed' ? `PhP  ${scheme.rate}/kWh` : `+ PhP ${scheme.rate}/kWh Admin Fee`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PricingSchemesTable;
