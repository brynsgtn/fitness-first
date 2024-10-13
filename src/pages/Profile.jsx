import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Profile() {
  const { user, setUser, registeredUsers, setRegisteredUsers } = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("Current user: ", user);
  }, [user]);

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleProfileUpdate = (updatedData) => {
    // Update the current user's data
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);

    // Find the user in the registeredUsers array and update it
    const updatedUsers = registeredUsers.map((registeredUser) => {
      if (registeredUser.id === user.id) {
        return { ...registeredUser, ...updatedData };
      }
      return registeredUser;
    });

    // Update the registeredUsers state and save to localStorage
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Update user in localStorage

    Swal.fire({
      title: 'Profile Updated Successfully!',
      icon: 'success',
      confirmButtonColor: '#f97316',
    });

    setIsModalOpen(false); // Close modal
  };

  return (
    <div className="max-w-3xl mx-auto h-full mt-5">
      <div className="px-4 sm:px-0">
        <h3 className="text-2xl font-semibold leading-7 text-gray-900">Your Profile</h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">First name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.firstName}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Last name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.lastName}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Role</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-transform: capitalize">{user.role}</dd>
          </div>
          {(user.role === "student") && <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Section</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.section}</dd>
          </div>}
        </dl>
      </div>
      <div className="flex justify-end mt-4">
        <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-yellow-400" onClick={handleUpdateClick}>
          Edit Profile
        </button>
      </div>
      {isModalOpen && (
        <UpdateProfileModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onUpdate={handleProfileUpdate}
          currentProfile={user}
        />
      )}
    </div>
  );
}

// Modal component to edit profile details
function UpdateProfileModal({ isOpen, onClose, onUpdate, currentProfile }) {
  const [updatedData, setUpdatedData] = useState(currentProfile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  const handleSave = () => {
    onUpdate(updatedData); // Call parent handler to update profile
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First name</label>
            <input
              type="text"
              name="firstName"
              value={updatedData.firstName}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last name</label>
            <input
              type="text"
              name="lastName"
              value={updatedData.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              name="email"
              value={updatedData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-yellow-400" onClick={handleSave}>
            Save
          </button>
          <button className="px-4 py-2 text-gray-500 hover:underline" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
