// List.js
export default function List({ currentStudents, currentPage, setCurrentPage, totalPages }) {
    return (
      <main>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
  
          {/* Responsive table container */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-center bg-white shadow-lg rounded-lg">
              <thead className="bg-orange-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Total Steps</th>
                  <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Avg Heart Rate</th>
                  <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Total Calories</th>
                  <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Section</th>
                  <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student, index) => (
                  <tr key={index} className={`group ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-yellow-400 transition duration-300`}>
                    <td className="px-4 py-3 whitespace-nowrap">{student.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{student.totalSteps}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{student.avgHeartRate}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{student.totalCalories}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{student.section}</td>
                    <td className="py-3 whitespace-nowrap">
                      <button
                        type="button"
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-400 transition duration-300"
                        onClick={() => alert(`View details for ${student.name}`)} // Placeholder action
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
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
      </main>
    );
  }
  