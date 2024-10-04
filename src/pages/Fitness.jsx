import React, { useState } from 'react';
import AddData from '../components/AddData';
import FitnessData from '../components/FitnessData';
import fitnessDataJson from '../assets/fitnessData.json';

export default function Fitness() {
  const [fitnessData, setFitnessData] = useState(fitnessDataJson);

  const addData = (newData) => {
    const newDataWithId = { ...newData, id: fitnessData.length + 1 };
    setFitnessData([...fitnessData, newDataWithId]);
  };

  const handleUpdate = (updatedItem) => {
    const updatedData = fitnessData.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setFitnessData(updatedData);
  };

  const handleDelete = (id) => {
    const filteredData = fitnessData.filter(item => item.id !== id);
    setFitnessData(filteredData);
  };

  return (
    <div className="min-h-full flex flex-col justify-center items-center px-6 py-20 lg:px-8">
      {/* For larger screens (lg and up), use flex-row, otherwise stack vertically */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="flex-1">
          <AddData onAddData={addData} />
        </div>
        <div className="flex-1">
          <FitnessData data={fitnessData} onDelete={handleDelete} 
            onUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  );
}
