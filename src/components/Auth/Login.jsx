import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add a loading state
  const [tooltipVisible, setTooltipVisible] = useState(false); // Tooltip state
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert("Please fill in both email and password.");
      return;
    }

    setLoading(true); // Start the loader
    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log("storedUser", storedUser);

      if (storedUser?.email === email && storedUser?.password === password) {
        setUser(storedUser);
        navigate("/shopping-lists");
      } else {
        alert("Invalid credentials");
      }

      setLoading(false); // Stop the loader after login logic
    }, 2000); // Delay for 2 seconds
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-photo/computer-mouse-paper-bags-blue-background-top-view_169016-43523.jpg)",
      }}
    >
      <h2 className="text-3xl font-bold text-white mb-5 shadow-md">
        Shoppee Partner
      </h2>
      <div className="bg-white/90 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-5">Login</h1>
        {loading ? (
          // Show loader when loading is true
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
        ) : (
          <>
            <div className="flex flex-col space-y-4">
              <input
                type="email"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-200 hover:shadow-md"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-200 hover:shadow-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between mt-5 space-x-3">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition w-full"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Forgot your password?{" "}
              <a
                href="#"
                className="text-blue-500 hover:underline relative"
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
              >
                Reset it here
              </a>
              {tooltipVisible && (
                <span className="absolute bg-gray-800 text-white text-xs rounded-lg py-2 px-3 mt-5 left-1/2 transform -translate-x-1/2 shadow-lg transition-opacity duration-300 ease-in-out opacity-100">
                  Feature coming soon! Stay tuned.
                </span>
              )}
              .
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
