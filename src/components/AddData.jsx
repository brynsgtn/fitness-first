import React from 'react';


export default function AddData({ onAddData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      totalSteps: e.target['total-steps'].value,
      caloriesBurned: e.target['calories-burned'].value,
      heartRate: e.target['heart-rate'].value,
      date: e.target['date'].value,
    };
    onAddData(newData);
    e.target.reset();
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col px-6 pt-2 pb-10 lg:px-2 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Monitor your activity
          </h2>
          <p className="mt-2 leading-9 tracking-tight text-gray-900">Add your fitness data</p>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="mt-2">
                <input
                  id="total-steps"
                  name="total-steps"
                  type="number"
                  required
                  min="0"
                  placeholder="Total steps"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="calories-burned"
                  name="calories-burned"
                  type="number"
                  required
                  min="0"
                  placeholder="Calories Burned"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="heart-rate"
                  name="heart-rate"
                  type="number"
                  required
                  min="0"
                  placeholder="Heart Rate"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Add data
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
