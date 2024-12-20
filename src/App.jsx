import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import Profile from "./components/Profiles/Profile";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [shoppingLists, setShoppingLists] = useState(() => {
    return JSON.parse(localStorage.getItem("shoppingLists")) || [];
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  useEffect(() => {
    localStorage.setItem("shoppingLists", JSON.stringify(shoppingLists));
  }, [shoppingLists]);

  useEffect(() => {
    // Disable scrolling on the login page
    if (location.pathname === "/") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [location.pathname]);

  const handleLogin = (loggedInUser) => {
    localStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      setUser(null);
      setLoading(false);
      navigate("/");
    }, 2000);
  };

  const handleDeleteData = () => {
    if (window.confirm("Are you sure you want to delete all your data?")) {
      localStorage.removeItem("shoppingLists");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      setUser(null);
      setShoppingLists([]);
      navigate("/");
    }
  };

  return (
    <div className={`app-container ${isLoggedIn ? "with-sidebar" : ""}`}>
      {isLoggedIn && (
        <aside className="sidebar fixed-sidebar">
          <h2>Menu</h2>
          <ul>
            <li className="menu-item">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="menu-item">
              <Link to="/shopping-lists">Shopping List</Link>
            </li>
            <li className="menu-item logout-container">
              {loading ? (
                <div className="loader"></div>
              ) : (
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              )}
            </li>
            <li className="menu-item">
              <button onClick={handleDeleteData} className="delete-data-button">
                Delete Data
              </button>
            </li>
          </ul>
        </aside>
      )}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Login setUser={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/shopping-lists"
            element={
              <ShoppingList
                shoppingLists={shoppingLists}
                setShoppingLists={setShoppingLists}
              />
            }
          />
          <Route
            path="/profile"
            element={<Profile user={user} shoppingLists={shoppingLists} />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
