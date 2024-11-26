import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getAllPricingSchemes, addPricingScheme, updatePricingScheme } from '../services/pricing_scheme_service';
import './pricing_schemes.css';

interface SortableRowProps {
  row: any;
  index: number;
  onDelete: (index: number) => void;
  onDropdownChange: (index: number, value: string) => void;
  onRateChange: (index: number, rate: string) => void;
  onRefresh: () => Promise<void>;
}

const SortableRow: React.FC<SortableRowProps> = ({
  row,
  index,
  onDelete,
  onDropdownChange,
  onRateChange,
  onRefresh,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: row.id,
  });

  const [existingPricingSchemes, setExistingPricingSchemes] = useState<string[]>([]);
  const [isInputFocused, setInputFocused] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPricingSchemes = async () => {
      try {
        const pricingSchemes = await getAllPricingSchemes();
        setExistingPricingSchemes(pricingSchemes.map((scheme: any) => scheme.pricing_scheme_id.toString()));
      } catch (err) {
        console.error('Failed to fetch pricing schemes:', err);
      }
    };

    loadPricingSchemes();
  }, []);

  const handleInputFocus = () => setInputFocused(true);

  const handleInputBlur = async () => {
    setInputFocused(false);

    if (!row.rate || error) {
      setDialogMessage('Rate is required and must be a valid positive decimal!');
      setDialogVisible(true);
      return;
    }

    try {
        // check if the row_id is in the list of pricing_scheme_id list from the database
        console.log(existingPricingSchemes)
        let row_id = row.id.replace('row-', '')
    
        console.log(row.id, row_id)
        console.log('existingg', existingPricingSchemes)
      if (existingPricingSchemes.includes(row_id)) {
        await updatePricingScheme(row.id, row.dropdownValue, row.rate);
        setDialogMessage('Pricing scheme updated successfully!');
      } else {
        await addPricingScheme(row.dropdownValue, row.rate, index + 1);
        setDialogMessage('Pricing scheme added successfully!');
      }

      setDialogVisible(true);
      await onRefresh();
    } catch (error) {
      console.error('Failed to save pricing scheme:', error);
      setDialogMessage('Failed to save pricing scheme. Please try again.');
      setDialogVisible(true);
    }
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setDialogMessage('');
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="pricing_scheme_row">
      <button className="delete_row_btn" onClick={() => onDelete(index)}>
        -
      </button>

      <div className="field_wrapper">
        <select
          value={row.dropdownValue}
          onChange={(e) => onDropdownChange(index, e.target.value)}
        >
          <option value="">Pricing Scheme</option>
          <option value="Fixed Pricing">Fixed Pricing</option>
          <option value="Variable-based">Variable-based</option>
        </select>

        {row.showTextField && (
          <input
            type="text"
            placeholder={row.placeholder}
            className="pricing_scheme_input"
            value={row.rate}
            onChange={(e) => {
              const value = e.target.value;
              setError(/^\d*\.?\d+$/.test(value) ? '' : 'Invalid rate format');
              onRateChange(index, value);
            }}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        )}
        {error && <span className="error_message">{error}</span>}
      </div>

      <div className="drag_handle" {...listeners} style={{ cursor: 'grab' }}>
        ☰
      </div>

      {dialogVisible && (
        <div className="dialog_overlay">
          <div className="dialog_box">
            <p>{dialogMessage}</p>
            <button onClick={closeDialog} className="dialog_close_button">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortableRow;
