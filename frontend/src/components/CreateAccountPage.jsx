import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const CreateAccountPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <FiUser className="w-6 h-6 text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <FiMail className="w-6 h-6 text-gray-600 mr-2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <FiLock className="w-6 h-6 text-gray-600 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Account
          </button>
          <p className="text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;
