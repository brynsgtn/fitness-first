import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../UserContext';
import dayjs from 'dayjs';

function InstructorReport() {
  const { registeredUsers } = useContext(UserContext);

  // Filter students from registered users
  const students = Array.isArray(registeredUsers)
    ? registeredUsers.filter((user) => user.role === 'student')
    : [];

  // State variables
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHealthData, setSelectedHealthData] = useState(null);

  // Calculate the health condition
  function calculateHealthStatus(totalSteps, averageHeartRate, totalCalories) {
    if (totalSteps >= 5000 && averageHeartRate <= 90 && totalCalories >= 300) {
      return 'Good';
    } else {
      return 'Needs Improvement';
    }
  }

  // Effect to handle initial data loading or section/student selection change
  useEffect(() => {
    if (selectedStudent) {
      const student = students.find((student) => student.email === selectedStudent);
      if (student && student.healthData.length > 0) {
        setSelectedDate(''); // Reset date on student change
        setSelectedHealthData(null); // Reset health data on student change
      }
    }
  }, [selectedStudent]);

  // Effect to update health data when a date is selected
  useEffect(() => {
    if (selectedStudent && selectedSection && selectedDate) {
      const student = students.find((student) => student.email === selectedStudent);
      const healthDataForDate = student.healthData.find((data) => data.date === selectedDate);
      setSelectedHealthData(healthDataForDate);
    }
  }, [selectedDate, selectedStudent, selectedSection]);

  // Filter students based on the selected section
  const studentsInSection = students.filter(
    (student) => student.section === selectedSection
  );

  // Clear the selection
  const clearSelection = () => {
    setSelectedStudent('');
    setSelectedSection('');
    setSelectedDate('');
    setSelectedHealthData(null);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 h-full">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">Student Health Report</h1>

      {/* Dropdown for selecting the section */}
      <div className="mb-6">
        <label htmlFor="sectionSelect" className="block text-lg font-semibold text-gray-600 mb-2">
          Select Section:
        </label>
        <select
          id="sectionSelect"
          value={selectedSection}
          onChange={(e) => {
            setSelectedSection(e.target.value);
            setSelectedStudent(''); // Reset student when section changes
          }}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="" disabled>
            Select a section:
          </option>
          {/* Get unique sections */}
          {[...new Set(students.map((student) => student.section))].map((section) => (
            <option key={section} value={section}>
              {section}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown for selecting the student */}
      {selectedSection && (
        <div className="mb-6">
          <label htmlFor="studentSelect" className="block text-lg font-semibold text-gray-600 mb-2">
            Select Student:
          </label>
          <select
            id="studentSelect"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Select a student
            </option>
            {studentsInSection.map((student) => (
              <option key={student.email} value={student.email}>
                {student.firstName} {student.lastName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Dropdown for selecting the date */}
      {selectedStudent && (
        <div className="mb-6">
          <label htmlFor="dateSelect" className="block text-lg font-semibold text-gray-600 mb-2">
            Select Date:
          </label>
          <select
            id="dateSelect"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Select a date:
            </option>
            {students
              .find((student) => student.email === selectedStudent)
              ?.healthData.map((data) => (
                <option key={data.id} value={data.date}>
                  {data.date}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Health Data Display */}
      {selectedDate && selectedHealthData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">Date</h2>
            <p className="text-xl text-gray-900 mt-2">{dayjs(selectedHealthData.date).format('MMM DD, YYYY')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">Total Steps</h2>
            <p className="text-xl text-gray-900 mt-2">{selectedHealthData.totalSteps}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">Heart Rate</h2>
            <p className="text-xl text-gray-900 mt-2">{selectedHealthData.averageHeartRate} bpm</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">Calories Burned</h2>
            <p className="text-xl text-gray-900 mt-2">{selectedHealthData.totalCalories} kcal</p>
          </div>
          <div className="bg-white px-auto p-4 rounded-lg shadow-md border border-gray-200 lg:col-span-4">
            <h2 className="text-lg font-bold text-gray-700">Health Status</h2>
            <p
              className={`text-xl mt-2 ${
                calculateHealthStatus(
                  selectedHealthData.totalSteps,
                  selectedHealthData.averageHeartRate,
                  selectedHealthData.totalCalories
                ) === 'Good'
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {calculateHealthStatus(
                selectedHealthData.totalSteps,
                selectedHealthData.averageHeartRate,
                selectedHealthData.totalCalories
              )}
            </p>
            <div className="text-sm text-gray-500 mt-4">
              <h3 className="font-semibold text-gray-700">Health Status Reference:</h3>
              <ul className="list-disc list-inside">
                <li>
                  <span className="font-bold text-green-600">Good:</span> Total steps ≥ 5000, average heart rate ≤ 90, calories burned ≥ 300
                </li>
                <li>
                  <span className="font-bold text-yellow-500">Needs Improvement:</span> At least one of the following criteria is not met:
                  <ul className="list-disc list-inside ps-5">
                    <li>Total steps ≥ 5000</li>
                    <li>Average heart rate ≤ 90</li>
                    <li>Calories burned ≥ 300</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Clear Selection Button */}
      {selectedHealthData && selectedDate && (
        <div className="mt-6">
          <button
            onClick={clearSelection}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
}

export default InstructorReport;
