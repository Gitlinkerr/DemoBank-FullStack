import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/Actions';
import styles from '../style';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
};


  return (
    <div className="bg-primary w-screen h-screen flex items-center justify-center">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <div>
            <h2 className="text-white text-4xl font-semibold">Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 mb-4"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Login
              </button>
            </form>
          </div>
          <p className="text-white mt-2">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 font-semibold">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
