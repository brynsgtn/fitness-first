import React, { useState } from 'react';

const initialStudents = [
  { name: 'Leslie Alexander', section: 'A', email: 'leslie.alexander@example.com', password: 'password123', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Michael Foster', section: 'B', email: 'michael.foster@example.com', password: 'password456', imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Dries Vincent', section: 'A', email: 'dries.vincent@example.com', password: 'password789', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Lindsay Walton', section: 'C', email: 'lindsay.walton@example.com', password: 'passwordabc', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Courtney Henry', section: 'B', email: 'courtney.henry@example.com', password: 'passworddef', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Tom Cook', section: 'C', email: 'tom.cook@example.com', password: 'passwordghi', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Anna Bell', section: 'A', email: 'anna.bell@example.com', password: 'passwordjkl', imageUrl: 'https://images.unsplash.com/photo-1523001394202-88b80c50c17e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'John Doe', section: 'B', email: 'john.doe@example.com', password: 'passwordmno', imageUrl: 'https://images.unsplash.com/photo-1502767048878-13a68c7a80f4?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Jane Smith', section: 'C', email: 'jane.smith@example.com', password: 'passwordpqr', imageUrl: 'https://images.unsplash.com/photo-1500679282828-1f1242b6bff5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Bob Brown', section: 'A', email: 'bob.brown@example.com', password: 'passwordstu', imageUrl: 'https://images.unsplash.com/photo-1510312979081-b4c4ae79a1e7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Emily White', section: 'B', email: 'emily.white@example.com', password: 'passwordvwx', imageUrl: 'https://images.unsplash.com/photo-1495471685359-0d5c4c23a567?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Kevin Black', section: 'C', email: 'kevin.black@example.com', password: 'passwordyz', imageUrl: 'https://images.unsplash.com/photo-1506812552516-35d509ef8a0a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
];

export default function Manage() {
  const [students, setStudents] = useState(initialStudents);
  const [newStudent, setNewStudent] = useState({
    name: '',
    section: '',
    email: '',
    password: '',
    imageUrl: 'https://via.placeholder.com/150',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.section && newStudent.email && newStudent.password) {
      setStudents([...students, newStudent]);
      setNewStudent({
        name: '',
        section: '',
        email: '',
        password: '',
        imageUrl: 'https://via.placeholder.com/150',
      });
      setIsModalOpen(false);
    }
  };

  const handleRemoveStudent = (name) => {
    setStudents(students.filter((student) => student.name !== name));
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsEditModalOpen(true);
  };

  const handleUpdateSection = () => {
    if (editingStudent && editingStudent.section) {
      setStudents(students.map((student) =>
        student.name === editingStudent.name ? { ...student, section: editingStudent.section } : student
      ));
      setEditingStudent(null);
      setIsEditModalOpen(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(students.length / studentsPerPage);

  return (
    <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-700 my-8">Manage Student</h1>
      <ul role="list" className="divide-y divide-gray-100">
        {currentStudents.map((student) => (
          <li key={student.name} className="flex flex-col sm:flex-row justify-between gap-y-2 sm:gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img alt="" src={student.imageUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{student.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{student.section}</p>
              </div>
            </div>
            <div className="flex flex-row items-end justify-end md:justify-between mt-2 sm:mt-0">
              <button
                onClick={() => handleRemoveStudent(student.name)}
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
      <div className='flex justify-end'>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white text-xs md:text-sm px-4 py-2 rounded mt-4"
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
              placeholder="Name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              className="border border-gray-300 rounded p-2 mt-2 w-full"
            />
            <input
              type="text"
              placeholder="Section"
              value={newStudent.section}
              onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
              className="border border-gray-300 rounded p-2 mt-2 w-full"
            />
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
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
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

      {/* Edit Section Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-bold">Edit Section for {editingStudent.name}</h2>
            <input
              type="text"
              placeholder="Section"
              value={editingStudent.section}
              onChange={(e) => setEditingStudent({ ...editingStudent, section: e.target.value })}
              className="border border-gray-300 rounded p-2 mt-2 w-full"
            />
            <button
              onClick={handleUpdateSection}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
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
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-blue-600 text-white hover:bg-yellow-400'}`}>
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
