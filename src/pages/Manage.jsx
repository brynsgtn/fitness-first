import React, { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../UserContext';
import Swal from 'sweetalert2'

export default function Manage() {
  const { registeredUsers, setRegisteredUsers } = useContext(UserContext);

  // Retrieve registered users from local storage on initial load
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    setRegisteredUsers(storedUsers);
  }, [setRegisteredUsers]);

  // Save registered users to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Filter students from registered users
  const students = Array.isArray(registeredUsers)
    ? registeredUsers.filter((user) => user.role === 'student')
    : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    id: uuidv4(),
    firstName: '',
    lastName: '',
    email: '',
    section: '',
    role: 'student',
    password: '',
    healthData: [
      {
        id: uuidv4(),
        date: null,
        totalCalories: null,
        averageHeartRate: null,
        totalSteps: null,
        healthCondition: null,
      },
    ],
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(students.length / studentsPerPage);

  // Add Student
  const handleAddStudent = () => {
    if (newStudent.firstName && newStudent.lastName && newStudent.section && newStudent.email && newStudent.password) {
      const updatedUsers = [...registeredUsers, { ...newStudent, role: 'student' }];
      setRegisteredUsers(updatedUsers);
      setNewStudent({
        id: uuidv4(),
        firstName: '',
        lastName: '',
        email: '',
        section: '',
        password: '',
        healthData: [
          {
            id: uuidv4(),
            date: null,
            totalCalories: null,
            averageHeartRate: null,
            totalSteps: null,
            healthCondition: null,
          },
        ],
      });
      setIsModalOpen(false);
    }
  };

  // Remove Student
  const handleRemoveStudent = (email) => {
    const updatedUsers = registeredUsers.filter((user) => user.email !== email);
    setRegisteredUsers(updatedUsers);
  };

  // Edit Student
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsEditModalOpen(true);
  };

  const handleUpdateStudent = () => {
    if (editingStudent) {
    // Check if the email already exists in registeredUsers, excluding the current student being edited
    const emailExists = registeredUsers.some(
      (user) => user.email === editingStudent.email && user.id !== editingStudent.id
    );

    if (emailExists) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Email already exists. Please use a different email.",
        showConfirmButton: false,
        timer: 1500
      });
      setEditingStudent(null);
      setIsEditModalOpen(false);
      return; // Exit function if email exists
    }

      setRegisteredUsers(updatedUsers);
      setEditingStudent(null);
      setIsEditModalOpen(false);
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-700 my-8">Manage Students</h1>
      <ul role="list" className="divide-y divide-gray-100">
        {currentStudents.map((student) => (
          <li key={student.email} className="flex flex-col sm:flex-row justify-between gap-y-2 sm:gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{student.firstName} {student.lastName}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{student.email}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{student.section}</p>
              </div>
            </div>
            <div className="flex flex-row items-end justify-end md:justify-between mt-2 sm:mt-0">
              <button
                onClick={() => handleRemoveStudent(student.email)}
                className="text-red-500 text-xs md:text-sm sm:mx-1 md:mx-3"
              >
                Remove
              </button>
              <button
                onClick={() => handleEditStudent(student)}
                className="text-blue-500 text-xs md:text-sm mt-1 mx-3"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-600 text-white text-xs md:text-sm px-4 py-2 rounded mt-4"
        >
          Add Student
        </button>
      </div>

    {/* Add Student Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
          <h2 className="text-lg font-bold">Add Student</h2>
          <input
            type="text"
            placeholder="First Name"
            value={newStudent.firstName}
            onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
            className="border border-gray-300 rounded p-2 mt-2 w-full"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newStudent.lastName}
            onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
            className="border border-gray-300 rounded p-2 mt-2 w-full"
          />
          <select
            value={newStudent.section}
            onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
            className="border border-gray-300 rounded p-2 mt-2 w-full"
          >
            <option value="" disabled>Select Section</option>
            <option value="UOX">UOX</option>
            <option value="Blended">Blended</option>
            <option value="Face to Face">Face to Face</option>
          </select>
          <input
            type="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            className="border border-gray-300 rounded p-2 mt-2 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={newStudent.password}
            onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
            className="border border-gray-300 rounded p-2 mt-2 w-full"
          />
          <button
            onClick={handleAddStudent}
            className="bg-orange-600 text-white px-4 py-2 rounded mt-4"
          >
            Add
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 text-black px-4 py-2 rounded mt-2 ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    )}


    {/* Edit Student Modal */}
    {isEditModalOpen && editingStudent && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
          <h2 className="text-lg font-bold">Edit Student</h2>
          <input
            type="text"
            placeholder="First Name"
            value={editingStudent.firstName}
            onChange={(e) => setEditingStudent({ ...editingStudent, firstName: e.target.value })}
            className="border border-gray-300 rounded p-2 mt-2 w-full"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={editingStudent.lastName}
            onChange={(e) => setEditingStudent({ ...editingStudent, lastName: e.target.value })}
            className="border border-gray-300 rounded p-2 mt-2 w-full"
          />
          <select
            value={editingStudent.section}
            onChange={(e) => setEditingStudent({ ...editingStudent, section: e.target.value })}
            className="border border-gray-300 rounded p-2 mt-2 w-full"
          >
            <option value="" disabled>Select Section</option>
            <option value="UOX">UOX</option>
            <option value="Blended">Blended</option>
            <option value="Face to Face">Face to Face</option>
          </select>
          <input
            type="email"
            placeholder="Email"
            value={editingStudent.email}
            onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
            className="border border-gray-300 rounded p-2 mt-2 w-full"
          />
          <button
            onClick={handleUpdateStudent}
            className="bg-orange-600 text-white px-4 py-2 rounded mt-4"
          >
            Update
          </button>
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="bg-gray-300 text-black px-4 py-2 rounded mt-2 ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    )}



 {/* Pagination Controls */}
 <div className="flex justify-center mt-6">
        <nav className="inline-flex shadow-sm">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === index + 1 ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-blue-600 text-white hover:bg-yellow-400'}`}>
            &gt;
          </button>
        </nav>
      </div>
    </div>
  );
}

