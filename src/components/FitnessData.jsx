import React, { useState, useContext } from 'react';
import UserContext from '../UserContext';
import dayjs from 'dayjs';

export default function FitnessData({ currentStudent, onDelete, onUpdate, currentData, name }) {
  const { user } = useContext(UserContext);

  // Extract the healthData from the current student
  const { healthData } = currentStudent || { healthData: [] }; // Default to empty array

  // State for pagination and editing
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Items to show per page
  const [editingItem, setEditingItem] = useState(null); // Track the item being edited
  const [formData, setFormData] = useState({
    date: '',
    totalSteps: '',
    totalCalories: '',
    averageHeartRate: '',
  });

  // Calculate the total pages
  const totalPages = Math.ceil(
    (user.role === "instructor" ? currentData.length - 1 : currentStudent.healthData.length - 1) / itemsPerPage // Adjust total pages
  );
  
  // Adjust the startIndex to account for hiding the first index
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Displayed data excluding the first index
  const displayedData = (user.role === "instructor" ? currentData : currentStudent.healthData)
    .slice(1) // Skip the first index
    .slice(startIndex, endIndex);

  // Function to handle editing of data
  const handleUpdateClick = (item) => {
    setEditingItem(item);
    setFormData({
      date: item.date,
      totalSteps: item.totalSteps,
      totalCalories: item.totalCalories,
      averageHeartRate: item.averageHeartRate,
    });
  };

  // Handle delete action
  const handleDelete = (id) => {
    onDelete(id);
  };

  // Handle form input changes during editing
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Save updated data and trigger onUpdate prop function
  const handleSave = () => {
    onUpdate({ ...editingItem, ...formData });
    setEditingItem(null); // Close the modal after saving
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingItem(null); // Cancel editing and close modal
  };

  return (
    <>
      {user.role === "instructor" ? (
        <div className="overflow-x-auto mt-2">
          <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-4">
            {`${name}'s Fitness Data`}
          </h2>

          <table className="min-w-full table-auto text-center bg-white shadow-lg rounded-lg mt-5">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Total Steps</th>
                <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Calories Burned</th>
                <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Heart Rate</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.length > 0 ? (
                displayedData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`group ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-yellow-400 transition duration-300`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      {dayjs(item.date).format('MMM DD YYYY')} {/* Format the date here */}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.totalSteps}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.totalCalories}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.averageHeartRate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-3">No data available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {currentData.length > itemsPerPage && (
            <div className="flex justify-between mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
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
  {healthData.length > 1 ? (
    healthData.slice(1).map((item, index) => ( // Skip the first index
      <tr
        key={item.id}
        className={`group ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-yellow-400 transition duration-300`}
      >
        <td className="px-4 py-3 whitespace-nowrap">
                      {dayjs(item.date).format('MMM DD YYYY')} {/* Format the date here */}
                    </td>
        <td className="px-4 py-3 whitespace-nowrap">{item.totalSteps}</td>
        <td className="px-4 py-3 whitespace-nowrap">{item.totalCalories}</td>
        <td className="px-4 py-3 whitespace-nowrap">{item.averageHeartRate}</td>
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
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center py-3">No data available</td>
    </tr>
  )}
</tbody>

          </table>

          {/* Pagination */}
          {healthData.length > itemsPerPage && (
            <div className="flex justify-between mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

{/* Update Form Modal */}
{editingItem && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full"> {/* Adjusted width here */}
      <h2 className="text-2xl font-bold mb-4">Edit Fitness Data</h2>
      <div>
        <label className="block mb-1">Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleFormChange}
          className="border border-gray-300 rounded-lg px-2 py-1 w-full mb-2"
        />
      </div>
      <div>
        <label className="block mb-1">Total Steps:</label>
        <input
          type="number"
          name="totalSteps"
          value={formData.totalSteps}
          onChange={handleFormChange}
          className="border border-gray-300 rounded-lg px-2 py-1 w-full mb-2"
        />
      </div>
      <div>
        <label className="block mb-1">Calories Burned:</label>
        <input
          type="number"
          name="totalCalories"
          value={formData.totalCalories}
          onChange={handleFormChange}
          className="border border-gray-300 rounded-lg px-2 py-1 w-full mb-2"
        />
      </div>
      <div>
        <label className="block mb-1">Heart Rate:</label>
        <input
          type="number"
          name="averageHeartRate"
          value={formData.averageHeartRate}
          onChange={handleFormChange}
          className="border border-gray-300 rounded-lg px-2 py-1 w-full mb-2"
        />
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-400 transition duration-300"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition duration-300 ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}
