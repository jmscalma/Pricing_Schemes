import './App.css';
import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, KeyboardSensor  } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import SortableRow from './components/pricing_schemes';
import { addPricingScheme } from './services/pricing_scheme_service';
import PricingSchemesTable from './components/pricing_schemes_table' 
import { getAllPricingSchemes, updatePricingSchemePosition, deletePricingScheme } from './services/pricing_scheme_service';


interface Row {
  id: string;
  dropdownValue: string;
  placeholder: string;
  showTextField: boolean;
  rate: string;
}

function App() {
  const [rows, setRows] = useState<Row[]>([]);
  const [pricingSchemes, setPricingSchemes] = useState<any[]>([]);

  const addPricingScheme = () => {
    setRows([
      ...rows,
      {
        id: `row-${Date.now()}`,
        dropdownValue: '',
        placeholder: '',
        showTextField: false,
        rate: '',
      },
    ]);
  };

    const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = rows.findIndex((row) => row.id === active.id);
      const newIndex = rows.findIndex((row) => row.id === over.id);

      const updatedRows = arrayMove(rows, oldIndex, newIndex);
      setRows(updatedRows);

      const reorderedData = updatedRows.map((row, index) => ({
        price_scheme_id: row.id.replace('row-', ''),
        new_order_position: String(index + 1),
      }));

      console.log('reorderedd',reorderedData)

      try {
        await updatePricingSchemePosition(reorderedData);

        await fetchPricingSchemes()
        console.log('Order saved successfully!');
      } catch (error) {
        console.error('Failed to save order:', error);
      }
    }
  };
  

  const handleDropdownChange = (index: number, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      dropdownValue: value,
      placeholder: value === 'Fixed Pricing' ? 'Rate' : 'Admin Fee',
      showTextField: value !== '',
      rate: '',
    };
    setRows(updatedRows);
  };

  const handleRateChange = (index: number, newRate: string) => {
    const updatedRows = [...rows];
    updatedRows[index].rate = newRate;
    setRows(updatedRows);
  };

  const deleteRow = async (index: number) => {
    const pricing_scheme = rows[index];
    
    const { id } = pricing_scheme;
    const pricing_scheme_id = String(id.replace('row-', ''))

    try{
      const response = await deletePricingScheme({ pricing_scheme_id });

      if (response.ok) {
        await fetchPricingSchemes()

        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
        console.log('Row deleted successfully');
      } else {
        console.error('Failed to delete row:', response.statusText);
      }
    }catch(error){
      console.error('Error deleting row:', error);
    }

    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchPricingSchemes = async () => {
    try {
      const response = await getAllPricingSchemes();
      if (response) {
        setPricingSchemes(response);
        setRows(response.map((scheme: any) => ({
          id: `row-${scheme.pricing_scheme_id}`,
          dropdownValue: scheme.pricing_type === 'Fixed' ? 'Fixed Pricing' : 'Variable-based',
          placeholder: scheme.pricing_type === 'Fixed' ? 'Rate' : 'Admin Fee',
          showTextField: true,
          rate: scheme.rate,
        })));
      }
    } catch (error) {
      console.error('Error fetching pricing schemes:', error);
    }
  };

  useEffect(() => {
    fetchPricingSchemes();
  }, []);
  
  return (
    <div className="main_container">
      <button id="addPricingSchemeBtn" onClick={addPricingScheme}>
        Add Pricing Scheme
      </button>
      <div className="pricing_scheme_container">
        <h1>Pricing Schemes</h1>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={rows.map((row) => row.id)}>
            {rows.map((row, index) => (
              <SortableRow
              key={row.id}
              row={row}
              index={index}
              onDelete={deleteRow}
              onDropdownChange={handleDropdownChange}
              onRateChange={handleRateChange}
              onRefresh={fetchPricingSchemes}
            />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <PricingSchemesTable pricingSchemes={pricingSchemes} />
    </div>
  );
}

export default App;