import React, { useState } from 'react';

export default function FitnessData({ data, onDelete, onUpdate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleUpdate = (item) => {
    onUpdate(item);
  };

  const handleDelete = (id) => {
    onDelete(id);
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
                  onClick={() => handleUpdate(item)}
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
    </div>
  );
}
