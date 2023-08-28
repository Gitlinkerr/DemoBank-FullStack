import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/Actions'; 
import { useNavigate } from 'react-router-dom';

const VerticalNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout(navigate));
}
  return (
    <div className="bg-gray-800 text-gray-200 w-20 flex flex-col items-center justify-between h-screen">
        <div>
            <Link className="w-full p-4 my-2 rounded-md hover:bg-gray-700 block text-center" to="/dashboard">Dashboard User</Link>
            <Link className="w-full p-4 my-2 rounded-md hover:bg-gray-700 block text-center" to="/pdf-upload">Upload PDF</Link>
            <div className="w-full p-4 my-2 rounded-md hover:bg-gray-700">Button 2</div>
            <Link className="w-full p-4 my-2 rounded-md hover:bg-gray-700 block text-center" to="/account-settings">Account Settings</Link>
            <Link className="w-full p-4 my-2 rounded-md hover:bg-gray-700 block text-center" to="/comment">Comments page</Link>

        </div>
        <button onClick={handleLogout} className="w-full p-4 mb-2 rounded-md hover:bg-gray-700 block text-center">Logout</button>
    </div>
  );
}

export default VerticalNavbar;
