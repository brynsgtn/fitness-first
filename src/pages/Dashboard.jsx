import { useState, useContext, useEffect } from 'react';
import List from '../components/List'; // Import the List component
import '../styles/dashboard.css';
import UserContext from '../UserContext';

export default function Dashboard() {
  const { user, registeredUsers } = useContext(UserContext);
  const students = registeredUsers.filter((user) => user.role === "student");
  const currentStudent = students.find((student) => student.id === user.id)
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // Logic to calculate displayed students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  // Logic for handling pagination
  const totalPages = Math.ceil(students.length / studentsPerPage);

  useEffect(() => {
    console.log("Current user: ", user);
    console.log("List of students: ", students);
    console.log("Current student: ", currentStudent);
  }, [user, registeredUsers]);

  return (
    <>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="header text-lg sm:text-xl md:text-2xl">
              {user.role === "instructor" ? "Instructor" : "Student"} {user.firstName} Dashboard
            </h1>
          </div>
        </header>

        {user.role === "instructor" ? (
          // If the user is an instructor, render the List component with all students
          <List
            currentStudents={currentStudents}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            isInstructor={true} // Pass a prop indicating the user is an instructor
          />
        ) : (
          // If the user is a student, render only their own data
          <List
            currentStudent={currentStudent} // Pass only the current student's data
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={1} // Only one page, since it's just the student's data
            isInstructor={false}
          />
        )}
      </div>
    </>
  );
}
