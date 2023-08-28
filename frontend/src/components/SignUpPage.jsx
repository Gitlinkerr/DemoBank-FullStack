import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../actions/Actions';
import styles from "../style";
import { setToken} from '../actions/Actions';
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSignUp = (e) => {
    e.preventDefault();

    const user = {
      firstname: firstname,
      lastname: lastname,
      email,
      password,
      role: 'USER'
    };

    dispatch(signUp(user, navigate))
      .then((response) => {
        const jwtToken = response.headers.authorization;
        setToken(jwtToken);
        })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <div className="bg-primary w-screen h-screen flex items-center justify-center">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <div>
            <h2 className="text-white text-4xl font-semibold">Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 mb-4"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 mb-4"
              />
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
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
