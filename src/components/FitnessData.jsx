import React, { useState } from 'react';

export default function FitnessData({ data, onDelete, onUpdate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItem, setEditingItem] = useState(null); // Track the item being edited
  const [formData, setFormData] = useState({
    date: '',
    totalSteps: '',
    caloriesBurned: '',
    heartRate: '',
  });
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleUpdateClick = (item) => {
    setEditingItem(item);
    setFormData({
      date: item.date,
      totalSteps: item.totalSteps,
      caloriesBurned: item.caloriesBurned,
      heartRate: item.heartRate,
    });
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onUpdate({ ...editingItem, ...formData });
    setEditingItem(null); // Close the modal after saving
  };

  const handleCancel = () => {
    setEditingItem(null); // Cancel editing and close modal
  };

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="overflow-x-auto mt-10">
      <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-4">
        Fitness Data
      </h2>
      <table className="min-w-full table-auto text-center bg-white shadow-lg rounded-lg">
        <thead className="bg-orange-600 text-white">
          <tr>
            <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Total Steps</th>
            <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Calories Burned</th>
            <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Heart Rate</th>
            <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr
              key={item.id}
              className={`group ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-yellow-400 transition duration-300`}
            >
              <td className="px-4 py-3 whitespace-nowrap">{item.date}</td>
              <td className="px-4 py-3 whitespace-nowrap">{item.totalSteps}</td>
              <td className="px-4 py-3 whitespace-nowrap">{item.caloriesBurned}</td>
              <td className="px-4 py-3 whitespace-nowrap">{item.heartRate}</td>
              <td className="py-3 whitespace-nowrap flex justify-center gap-2">
                <button
                  type="button"
                  className="bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-400 transition duration-300"
                  onClick={() => handleUpdateClick(item)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-400 transition duration-300"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav className="inline-flex shadow-sm">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 border rounded-l-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-orange-600 text-white hover:bg-yellow-400'}`}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number + 1)}
              className={`px-4 py-2 border ${currentPage === number + 1 ? 'bg-yellow-400' : 'bg-orange-600 text-white hover:bg-yellow-400'}`}
            >
              {number + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 border rounded-r-lg ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-orange-600 text-white hover:bg-yellow-400'}`}
          >
            Next
          </button>
        </nav>
      </div>

      {/* Modal for Editing */}
      {editingItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Update Fitness Data</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Date:</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Total Steps:</label>
              <input
                type="text"
                name="totalSteps"
                value={formData.totalSteps}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Calories Burned:</label>
              <input
                type="text"
                name="caloriesBurned"
                value={formData.caloriesBurned}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Heart Rate:</label>
              <input
                type="text"
                name="heartRate"
                value={formData.heartRate}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
