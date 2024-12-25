import React from "react";
import Header from "../Header";

const Profile = ({ user, shoppingLists }) => {
  const totalItems = shoppingLists.reduce(
    (sum, list) => sum + list.items.length,
    0
  );
  const boughtItems = shoppingLists.reduce(
    (sum, list) => sum + list.items.filter((item) => item.bought).length,
    0
  );

  console.log("user.name", user.name.length, typeof user.name);

  return (
    <div className="max-w-6xl mx-auto my-16 p-8 bg-white rounded-lg shadow-2xl font-sans">
      {/* Header Section */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Welcome, {user?.name || "Guest"}!
      </h1>
      <p className="text-center text-gray-600 text-lg sm:text-base">
        Manage your shopping lists and see your progress below.
      </p>

      {/* Profile Info */}
      <div className="mt-10 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center">
            <img
              src={
                user?.name === "Bala"
                  ? "https://media.licdn.com/dms/image/v2/C5603AQHhiRtKiGLCtQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1657793818701?e=2147483647&v=beta&t=_3UOuzs4UMfHfBzfKEZ7RoKes85Utaf1j6L-DLa69dE" // Replace with Bala's image URL
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              }
              alt="User Avatar"
              className="w-28 h-28 rounded-full shadow-lg mb-4 border-4 border-purple-500"
            />
            <h2 className="text-xl font-bold text-gray-700">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <div className="text-gray-800">
            <p className="text-lg sm:text-base mb-3">
              <strong>Shopping Lists:</strong> {shoppingLists.length}
            </p>
            <p className="text-lg sm:text-base mb-3">
              <strong>Total Items:</strong> {totalItems}
            </p>
            <p className="text-lg sm:text-base">
              <strong>Bought Items:</strong> {boughtItems}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-10 flex flex-wrap justify-center gap-8">
        <div className="w-44 h-44 sm:w-36 sm:h-36 rounded-full flex flex-col justify-center items-center text-white text-center font-bold shadow-xl bg-gradient-to-br from-pink-500 to-pink-400 hover:scale-105 transform transition">
          <p className="text-sm sm:text-xs">Total Lists</p>
          <h2 className="text-3xl sm:text-2xl">{shoppingLists.length}</h2>
        </div>
        <div className="w-44 h-44 sm:w-36 sm:h-36 rounded-full flex flex-col justify-center items-center text-white text-center font-bold shadow-xl bg-gradient-to-br from-blue-500 to-blue-400 hover:scale-105 transform transition">
          <p className="text-sm sm:text-xs">Total Items</p>
          <h2 className="text-3xl sm:text-2xl">{totalItems}</h2>
        </div>
        <div className="w-44 h-44 sm:w-36 sm:h-36 rounded-full flex flex-col justify-center items-center text-white text-center font-bold shadow-xl bg-gradient-to-br from-teal-400 to-teal-300 hover:scale-105 transform transition">
          <p className="text-sm sm:text-xs">Bought Items</p>
          <h2 className="text-3xl sm:text-2xl">{boughtItems}</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
