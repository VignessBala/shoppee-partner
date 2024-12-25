import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name cannot be empty";
    }

    if (!email.trim()) {
      newErrors.email = "Email cannot be empty";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password cannot be empty";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Valid if no errors
  };

  const handleSignup = () => {
    if (!validateInputs()) return;

    const existingUser = JSON.parse(localStorage.getItem("user"));

    if (existingUser?.email === email) {
      alert("Email already exists. Please use a different email.");
      return;
    }

    setLoading(true); // Start the loader
    setTimeout(() => {
      const newUser = { name, email, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      alert("Signup successful!");
      setLoading(false); // Stop the loader
      navigate("/");
    }, 2000); // Delay for 2 seconds
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-photo/computer-mouse-paper-bags-blue-background-top-view_169016-43523.jpg")',
      }}
    >
      <h2 className="text-3xl font-bold text-white mb-5 shadow-md">
        Shoppee Partner
      </h2>
      <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg text-center w-96 max-w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-5">Signup</h1>
        {loading ? (
          <div className="border-4 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin mx-auto my-5"></div>
        ) : (
          <>
            <div className="flex flex-col space-y-4 w-full">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <small className="text-red-500 text-sm text-left">
                  {errors.name}
                </small>
              )}

              <input
                type="email"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <small className="text-red-500 text-sm text-left">
                  {errors.email}
                </small>
              )}

              <input
                type="password"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <small className="text-red-500 text-sm text-left">
                  {errors.password}
                </small>
              )}
            </div>
            <div className="flex justify-between mt-5 space-x-3">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
                onClick={handleSignup}
              >
                Signup
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition w-full"
                onClick={() => navigate("/")}
              >
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
