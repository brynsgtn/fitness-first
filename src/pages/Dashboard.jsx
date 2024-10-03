// Dashboard.js
import { useState } from 'react';
import List from '../components/List'; // Import the List component
import '../styles/dashboard.css';
import students from '../assets/students.json';

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
        
        {/* Use the List component and pass necessary props */}
        <List
          currentStudents={currentStudents}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
