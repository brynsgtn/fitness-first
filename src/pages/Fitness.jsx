import React, { useContext, useEffect } from 'react';
import AddData from '../components/AddData';
import FitnessData from '../components/FitnessData';
import UserContext from '../UserContext';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';


export default function Fitness() {
  const { user, registeredUsers, setRegisteredUsers } = useContext(UserContext);
  const { id } = useParams(); // Use 'id' from the URL parameters

  // Load registeredUsers from local storage on component mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('registeredUsers');
    if (storedUsers) {
      setRegisteredUsers(JSON.parse(storedUsers));
    }
  }, [setRegisteredUsers]);

  const students = registeredUsers.filter((u) => u.role === "student");

  // Find the current student based on the 'id' parameter
  const currentSelectedStudent = students.find((student) => student.id === id) || null;

  useEffect(() => {
    console.log("Current selected user: ", currentSelectedStudent);
  }, [currentSelectedStudent]);

  const addData = (newData) => {
    if (currentSelectedStudent) {
      const newHealthEntry = { id: uuidv4(), ...newData };
      const updatedUsers = registeredUsers.map((u) => {
        if (u.id === currentSelectedStudent.id) {
          return { ...u, healthData: [...u.healthData, newHealthEntry] };
        }
        return u;
      });

      setRegisteredUsers(updatedUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

      Swal.fire({
        title: 'Added Successfully!',
        icon: 'success',
        confirmButtonColor: '#f97316',
      });
    }
  };

  const handleUpdate = (updatedItem) => {
    if (currentSelectedStudent) {
      const updatedUsers = registeredUsers.map((u) => {
        if (u.id === currentSelectedStudent.id) {
          const updatedHealthData = u.healthData.map(item =>
            item.id === updatedItem.id ? { ...item, ...updatedItem } : item
          );
          return { ...u, healthData: updatedHealthData };
        }
        return u;
      });

      setRegisteredUsers(updatedUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      Swal.fire({
        title: 'Updated Successfully!',
        icon: 'success',
        confirmButtonColor: '#f97316',
      });
    }
  };

  const handleDelete = (id) => {
    if (currentSelectedStudent) {
      const updatedUsers = registeredUsers.map((u) => {
        if (u.id === currentSelectedStudent.id) {
          const filteredHealthData = u.healthData.filter(item => item.id !== id);
          return { ...u, healthData: filteredHealthData };
        }
        return u;
      });

      setRegisteredUsers(updatedUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      Swal.fire({
        title: 'Deleted Successfully!',
        icon: 'success',
        confirmButtonColor: '#f97316',
      });
    }
  };

  return (
    <>
      {user.role === "instructor" ? (
        <div className="min-h-full flex flex-col justify-center items-center px-6 py-10 lg:px-8">
          <div className="flex flex-col lg:flex-row w-full max-w-7xl space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="flex-1">
              <FitnessData currentData={currentSelectedStudent?.healthData} name={currentSelectedStudent?.firstName} />
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-full flex flex-col justify-center items-center px-6 py-20 lg:px-8">
          <div className="flex flex-col lg:flex-row w-full max-w-7xl space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="flex-1">
              <AddData onAddData={addData} />
            </div>
            <div className="flex-1">
              <FitnessData
                currentStudent={currentSelectedStudent}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                currentData={currentSelectedStudent?.healthData}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
