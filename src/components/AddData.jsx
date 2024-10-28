import React, { useState } from 'react';

export default function AddData({ onAddData }) {
  const [formData, setFormData] = useState({
    date: '',
    totalSteps: '',
    totalCalories: '',
    averageHeartRate: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddData(formData );
    setFormData({
      date: '',
      totalSteps: '',
      totalCalories: '',
      averageHeartRate: '',
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col px-6 pt-2 pb-10 lg:px-2">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Monitor your activity
        </h2>
        <p className="mt-2 leading-9 tracking-tight text-gray-900">Add your fitness data</p>
      </div>
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="mt-2">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>        
          <div>
            <div className="mt-2">
              <input
                type="number"
                name="totalSteps"
                value={formData.totalSteps}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                placeholder="Total Steps"
                required
                min="0"  // Prevents negative numbers
              />
            </div>
          </div> 
          <div>
            <div className="mt-2">
              <input
                type="number"
                name="totalCalories"
                value={formData.totalCalories}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                placeholder="Calories Burned"
                required
                min="0"  // Prevents negative numbers
              />
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input
                type="number"
                name="averageHeartRate"
                value={formData.averageHeartRate}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                placeholder="Average Heart Rate"
                required
                min="0"  // Prevents negative numbers
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Add Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
