import React from 'react';

const Profile = ({ user, shoppingLists }) => {
  const totalItems = shoppingLists.reduce((sum, list) => sum + list.items.length, 0);
  const boughtItems = shoppingLists.reduce(
    (sum, list) => sum + list.items.filter((item) => item.bought).length,
    0
  );

  return (
    <div className="max-w-4xl mx-auto my-5 p-5 bg-gray-100 rounded-lg shadow-md text-center font-sans">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="mt-4 text-gray-800">
        <p className="text-lg"><strong>Name:</strong> {user?.name}</p>
        <p className="text-lg"><strong>Email:</strong> {user?.email}</p>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-5">
        <div className="w-36 h-36 rounded-full flex flex-col justify-center items-center text-white text-center font-bold shadow-lg animate-float bg-gradient-to-br from-pink-500 to-pink-400">
          <p className="text-sm">Total Lists</p>
          <h2 className="text-2xl">{shoppingLists.length}</h2>
        </div>
        <div className="w-36 h-36 rounded-full flex flex-col justify-center items-center text-white text-center font-bold shadow-lg animate-float bg-gradient-to-br from-blue-500 to-blue-400">
          <p className="text-sm">Total Items</p>
          <h2 className="text-2xl">{totalItems}</h2>
        </div>
        <div className="w-36 h-36 rounded-full flex flex-col justify-center items-center text-white text-center font-bold shadow-lg animate-float bg-gradient-to-br from-teal-400 to-teal-300">
          <p className="text-sm">Bought Items</p>
          <h2 className="text-2xl">{boughtItems}</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;