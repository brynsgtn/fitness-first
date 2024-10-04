import React, { useState } from 'react';

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
    onUpdate(updatedData);
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={updatedData.role}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Section</label>
            <textarea
              name="section"
              value={updatedData.section}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-4 py-2 text-gray-500 hover:underline"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Margot',
    lastName: 'Foster',
    email: 'margotfoster@example.com',
    role: 'Student/Instructor',
    section:
      'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat...',
  });

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleProfileUpdate = (updatedData) => {
    setProfile(updatedData);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto h-full mt-10 md:mt-20">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Your Profile</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">First name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.firstName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Last name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.lastName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Role</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.role}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Section</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.section}
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 text-blue-500 font-medium hover:underline focus:outline-none"
          onClick={handleUpdateClick}
        >
          Edit Profile
        </button>
      </div>
      {isModalOpen && (
        <UpdateProfileModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onUpdate={handleProfileUpdate}
          currentProfile={profile}
        />
      )}
    </div>
  );
}
