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
import { Icons } from "./constants/icons";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("shoppingLists", JSON.stringify(shoppingLists));
  }, [shoppingLists]);

  useEffect(() => {
    if (location.pathname === "/") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768); // Show sidebar on desktop
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = (loggedInUser) => {
    localStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
    setUser(loggedInUser);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
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

  const handleRippleEffect = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "ripple";
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600); // Match duration with the CSS animation
  };

  return (
    <div className={`flex h-screen ${isLoggedIn ? "" : "overflow-hidden"}`}>
      {isLoggedIn && isSidebarOpen && (
        <div
          className="sidebar-overlay open"
          onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking outside
        ></div>
      )}

      {isLoggedIn && (
        <aside
          className={`w-64 bg-gray-100 shadow-md fixed h-full flex flex-col p-4 ${
            isSidebarOpen ? "open" : "closed"
          }`}
        >
          {/* Close icon for mobile view */}
          <button
            className="bg-gray-200 p-2 rounded-md shadow-md z-50 md:hidden mb-4"
            onClick={() => setIsSidebarOpen(false)}
          >
            <img src={Icons.closeIcon} alt="Close Menu" className="h-6 w-6" />
          </button>

          {/* Sidebar menu */}
          <div className="flex flex-col flex-grow">
            <h2 className="text-xl font-bold mb-4 hidden md:block">Menu</h2>
            <ul className="space-y-4">
              <li>
                <div
                  className="ripple-container"
                  onClick={(e) => handleRippleEffect(e)}
                >
                  <Link
                    to="/profile"
                    className="block bg-gray-200 rounded px-4 py-2 hover:bg-gray-300"
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setIsSidebarOpen(false); // Close sidebar only in mobile view
                      }
                    }}
                  >
                    Profile
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className="ripple-container"
                  onClick={(e) => handleRippleEffect(e)}
                >
                  <Link
                    to="/shopping-lists"
                    className="block bg-gray-200 rounded px-4 py-2 hover:bg-gray-300"
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setIsSidebarOpen(false); // Close sidebar only in mobile view
                      }
                    }}
                  >
                    Shopping List
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="mt-4 space-y-4">
            <button
              onClick={handleDeleteData}
              className="w-full bg-yellow-500 text-white font-bold py-2 rounded hover:bg-yellow-600"
            >
              Delete Data
            </button>
            {loading ? (
              <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin mx-auto"></div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </aside>
      )}

      <main
        className={`flex-grow p-6 ${
          isLoggedIn && isSidebarOpen ? "ml-64" : ""
        } overflow-y-auto bg-gray-50`}
      >
        {isLoggedIn && (
          <button
            className="fixed top-4 left-4 bg-gray-200 p-2 rounded-md shadow-md z-50 md:hidden"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            {isSidebarOpen ? (
              <img src={Icons.closeIcon} alt="Close Menu" className="h-6 w-6" />
            ) : (
              <img src={Icons.menuIcon} alt="Open Menu" className="h-6 w-6" />
            )}
          </button>
        )}

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
