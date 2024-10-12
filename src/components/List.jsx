import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from '../UserContext';

export default function List({ currentStudents, currentPage, setCurrentPage, totalPages, isInstructor, currentStudent }) {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("Current student: ", currentStudent);
  }, [currentStudent]);

  const goToHealthMonitoring = (currentUser) => {
    navigate(`/fitness/${currentUser.id}`);
  };

  // Function to calculate totals for each student's health data
  const calculateTotalHealthData = (healthData) => {
    const totalCalories = healthData.reduce((acc, data) => acc + (parseFloat(data.totalCalories) || 0), 0);
    const totalSteps = healthData.reduce((acc, data) => acc + (parseFloat(data.totalSteps) || 0), 0);
    const averageHeartRate = healthData.length > 0 
      ? (healthData.reduce((acc, data) => acc + (parseFloat(data.averageHeartRate) || 0), 0) / healthData.length).toFixed(2)
      : 0;

    return { totalCalories, totalSteps, averageHeartRate };
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-x-auto">
          {isInstructor ? (
            <table className="min-w-full table-auto text-center bg-white shadow-lg rounded-lg">
              <thead className="bg-orange-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Student Name</th>
                  <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Total Calories</th>
                  <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Avg Heart Rate</th>
                  <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Total Steps</th>
                  <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Section</th>
                  <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student, index) => {
                  const { totalCalories, totalSteps, averageHeartRate } = calculateTotalHealthData(student.healthData || []);
                  return (
                    <tr key={student.id || index} className={`group ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-yellow-400 transition duration-300`}>
                      <td className="px-4 py-3 whitespace-nowrap">{`${student.firstName} ${student.lastName}`}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{totalCalories > 0 ?  totalCalories  : "No Activity Yet"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{averageHeartRate > 0 ? averageHeartRate : "No Activity Yet"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{totalSteps || "No Activity Yet"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{student.section}</td>
                      <td className="py-3 whitespace-nowrap">
                        <button
                          type="button"
                          className="bg-orange-600 text-white px-2 py-1 rounded-lg hover:bg-yellow-400 transition duration-300"
                          onClick={() => goToHealthMonitoring(student)} // Navigate to the student's health monitoring page
                        >
                          View Activity
                        </button>
                      </td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
          ) : (
            <table className="min-w-full table-auto text-center bg-white shadow-lg rounded-lg">
              <thead className="bg-orange-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Total Calories</th>
                  <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Avg Heart Rate</th>
                  <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Total Steps</th>
                  <th className="px-4 py-3 text-sm font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudent.healthData && currentStudent.healthData.length > 0 ? (
                  <tr>
                  <td className="px-4 py-3">
                    {currentStudent.healthData.length <= 1 ? "No Activity Yet" : currentStudent.healthData.reduce((acc, data) => acc + (parseFloat(data.totalCalories) || 0), 0).toLocaleString('en-US')}
                  </td>
                    <td className="px-4 py-3">
                        {currentStudent.healthData.length <= 1 ?  "No Activity Yet": (
                            <span>
                                {(currentStudent.healthData.reduce((acc, data) => acc + (parseFloat(data.averageHeartRate) || 0), 0) / currentStudent.healthData.length).toFixed(2)}
                                &nbsp;bpm
                            </span>
                        )}
                    </td>
                    <td className="px-4 py-3">
                        {currentStudent.healthData.length <= 0 ?
                            "No Activity Yet" :
                            currentStudent.healthData.reduce((acc, data) => acc + (parseFloat(data.totalSteps) || 0), 0).toLocaleString('en-US')
                        }
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <button
                        type="button"
                        className="bg-orange-600 text-white px-2 py-1 rounded-lg hover:bg-yellow-400 transition duration-300"
                        onClick={() => goToHealthMonitoring(user)}
                      >
                        {currentStudent.healthData.length > 1 ? "View Activity" : "Add Activity"}
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center px-4 py-3">No Health Data Available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
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
        )}
      </div>
    </main>
  );
}
