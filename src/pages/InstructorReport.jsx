import React, { useState } from 'react';

function InstructorReport() {
  const studentData = {
    'John Doe': {
      '2024-10-01': { totalSteps: 8000, heartRate: 85, caloriesBurned: 450, healthStatus: 'Good' },
      '2024-10-02': { totalSteps: 3000, heartRate: 95, caloriesBurned: 250, healthStatus: 'Needs Improvement' },
      '2024-10-03': { totalSteps: 12000, heartRate: 70, caloriesBurned: 600, healthStatus: 'Good' },
      '2024-10-04': { totalSteps: 4000, heartRate: 88, caloriesBurned: 200, healthStatus: 'Needs Improvement' },
      '2024-10-05': { totalSteps: 10000, heartRate: 80, caloriesBurned: 500, healthStatus: 'Good' }
    },
    'Jane Smith': {
      '2024-10-01': { totalSteps: 5000, heartRate: 78, caloriesBurned: 300, healthStatus: 'Good' },
      '2024-10-02': { totalSteps: 9000, heartRate: 82, caloriesBurned: 400, healthStatus: 'Good' },
      '2024-10-03': { totalSteps: 2000, heartRate: 90, caloriesBurned: 150, healthStatus: 'Needs Improvement' },
      '2024-10-04': { totalSteps: 7000, heartRate: 85, caloriesBurned: 350, healthStatus: 'Good' },
      '2024-10-05': { totalSteps: 4000, heartRate: 92, caloriesBurned: 200, healthStatus: 'Needs Improvement' }
    }
  };

  const [selectedStudent, setSelectedStudent] = useState('John Doe');
  const [selectedDate, setSelectedDate] = useState('2024-10-01');
  
  const healthData = studentData[selectedStudent];
  const { totalSteps, heartRate, caloriesBurned, healthStatus } = healthData[selectedDate];

  const healthStatusReference = (
    <div className="text-sm text-gray-500 mt-4">
      <h3 className="font-semibold text-gray-700">Health Status Reference:</h3>
      <ul className="list-disc list-inside">
        <li><span className="font-bold">Good:</span> Total steps ≥ 5000, heart rate ≤ 90, calories burned ≥ 300</li>
        <li><span className="font-bold">Needs Improvement:</span> At least one of the above criteria is not met</li>
      </ul>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 h-full">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">Student Health Report</h1>

      {/* Dropdown for selecting the student */}
      <div className="mb-6">
        <label htmlFor="studentSelect" className="block text-lg font-semibold text-gray-600 mb-2">Select Student:</label>
        <select
          id="studentSelect"
          value={selectedStudent}
          onChange={(e) => {
            setSelectedStudent(e.target.value);
            setSelectedDate(Object.keys(studentData[e.target.value])[0]); // Reset to the first date
          }}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          {Object.keys(studentData).map((student) => (
            <option key={student} value={student}>{student}</option>
          ))}
        </select>
      </div>

      {/* Dropdown for selecting the date */}
      <div className="mb-6">
        <label htmlFor="dateSelect" className="block text-lg font-semibold text-gray-600 mb-2">Select Date:</label>
        <select
          id="dateSelect"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          {Object.keys(healthData).map((date) => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
      </div>

      {/* Responsive layout for the report cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Date</h2>
          <p className="text-xl text-gray-900 mt-2">{selectedDate}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Total Steps</h2>
          <p className="text-xl text-gray-900 mt-2">{totalSteps}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Heart Rate</h2>
          <p className="text-xl text-gray-900 mt-2">{heartRate} bpm</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Calories Burned</h2>
          <p className="text-xl text-gray-900 mt-2">{caloriesBurned} kcal</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-700">Health Status</h2>
          <p className={`text-xl mt-2 ${healthStatus === 'Good' ? 'text-green-500' : 'text-red-500'}`}>{healthStatus}</p>
          {healthStatusReference}
        </div>
      </div>
    </div>
  );
}

export default InstructorReport;
