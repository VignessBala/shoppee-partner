import React from 'react';
import './styles/Profile.css';

const Profile = ({ user, shoppingLists }) => {
  const totalItems = shoppingLists.reduce((sum, list) => sum + list.items.length, 0);
  const boughtItems = shoppingLists.reduce(
    (sum, list) => sum + list.items.filter((item) => item.bought).length,
    0
  );

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
      <div className="bubble-container">
        <div className="bubble bubble-lists">
          <p>Total Lists</p>
          <h2>{shoppingLists.length}</h2>
        </div>
        <div className="bubble bubble-items">
          <p>Total Items</p>
          <h2>{totalItems}</h2>
        </div>
        <div className="bubble bubble-bought">
          <p>Bought Items</p>
          <h2>{boughtItems}</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
