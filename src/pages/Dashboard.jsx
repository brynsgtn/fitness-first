import { useState } from 'react';
import '../styles/dashboard.css'

const students = [
  {
    name: 'John Doe',
    totalSteps: 15000,
    avgHeartRate: 75,
    totalCalories: 500,
    section: 'A1',
  },
  {
    name: 'Jane Smith',
    totalSteps: 12000,
    avgHeartRate: 82,
    totalCalories: 450,
    section: 'B2',
  },
  {
    name: 'Mike Johnson',
    totalSteps: 18000,
    avgHeartRate: 70,
    totalCalories: 600,
    section: 'A1',
  },
  {
    name: 'Emily Davis',
    totalSteps: 16000,
    avgHeartRate: 78,
    totalCalories: 550,
    section: 'C3',
  },
  {
    name: 'Anna Brown',
    totalSteps: 14000,
    avgHeartRate: 80,
    totalCalories: 520,
    section: 'B2',
  },
  {
    name: 'Chris Evans',
    totalSteps: 17000,
    avgHeartRate: 77,
    totalCalories: 580,
    section: 'A2',
  },
  {
    name: 'Alice Taylor',
    totalSteps: 13000,
    avgHeartRate: 83,
    totalCalories: 480,
    section: 'C1',
  },
  {
    name: 'David Wilson',
    totalSteps: 16000,
    avgHeartRate: 79,
    totalCalories: 550,
    section: 'A3',
  },
  {
    name: 'Sophia Moore',
    totalSteps: 19000,
    avgHeartRate: 72,
    totalCalories: 620,
    section: 'B3',
  },
  {
    name: 'Peter Parker',
    totalSteps: 20000,
    avgHeartRate: 65,
    totalCalories: 700,
    section: 'C2',
  },
];

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // Logic to calculate displayed students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  // Logic for handling pagination
  const totalPages = Math.ceil(students.length / studentsPerPage);

  return (
    <>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="header text-lg sm:text-xl md:text-2xl">Student/Instructor Dashboard</h1>
          </div>
        </header>
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
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
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
      </div>
    </>
  );
}
