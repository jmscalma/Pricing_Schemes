export const addPricingScheme = async (
    pricing_scheme_type: string,
    rate: string,
    n_order_position: number
    
  ) => {
    if (!rate) {
      alert('Text field should not be empty.');
      return;
    }

    let pricing_type: string
    const order_position = String(n_order_position)

    if(pricing_scheme_type === 'Variable-based'){
        pricing_type = 'Variable'
    }
    else{
        pricing_type = 'Fixed'
    }

    const payload = {
        pricing_type,
        rate,
        order_position,
    };
  
    try {
      const response = await fetch('http://localhost:3000/pricing-scheme/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        console.log('Data sent successfully!');
      } else {
        console.error('Error sending data:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
};


export const getAllPricingSchemes = async () => {
    try {
      const response = await fetch('http://localhost:3000/pricing-scheme/all');
      if (response.ok) {
        const data = await response.json();
        return data.pricing_schemes || [];
      } else {
        console.error('Error fetching pricing schemes:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error fetching pricing schemes:', error);
      return [];
    }
};

export const updatePricingSchemePosition = async (
    reorderedPricingSchemes: Array<{ price_scheme_id: string; new_order_position: string }>
    
  ) => {
    
    console.log('for payloadd',reorderedPricingSchemes)
    const payload = {
        reordered_pricing_schemes: reorderedPricingSchemes
    };
  
    try {
      const response = await fetch('http://localhost:3000/pricing-scheme/update/position', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        console.log('Data sent successfully!');
      } else {
        console.error('Error sending data:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
};


export const deletePricingScheme = async ({ pricing_scheme_id }: { pricing_scheme_id: string }) => {
    const response = await fetch(`http://localhost:3000/pricing-scheme/delete?pricing_scheme_id=${encodeURIComponent(pricing_scheme_id)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    return response;
};
  