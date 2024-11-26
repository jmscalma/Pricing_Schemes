import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { addPricingScheme } from '../services/pricing_scheme_service';
import './pricing_schemes.css'

interface SortableRowProps {
  row: any;
  index: number;
  onDelete: (index: number) => void;
  onDropdownChange: (index: number, value: string) => void;
  onRateChange: (index: number, rate: string) => void;
  onRefresh: () => Promise<void>;
}

const SortableRow: React.FC<SortableRowProps> = ({ row, index, onDelete, onDropdownChange, onRateChange, onRefresh }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: row.id,
  });

  const [isInputFocused, setInputFocused] = useState(false);

  const handleInputFocus = () => setInputFocused(true);

  const handleInputBlur = async () => {
    setInputFocused(false);

    if (!row.rate) {
      alert('Rate is required before submitting.');
      return;
    }

    try {
      await addPricingScheme(row.dropdownValue, row.rate, index + 1);
      await onRefresh();
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
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
            onChange={(e) => onRateChange(index, e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        )}
      </div>

      <div
        className="drag_handle"
        {...listeners}
        style={{ cursor: 'grab' }}
      >
        ☰
      </div>
    </div>
  );
};

export default SortableRow;
