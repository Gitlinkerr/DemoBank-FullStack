import React, { useEffect, useState } from "react";
import FundTransferForm from "./FundTransferForm";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../actions/Actions';
import { toast } from 'react-toastify'; 
import {instance as axios} from '../config/axiosConfig';



const Dashboard = () => {
  const currentUser = useSelector(state => state.user);
  const balanceData = useSelector(state => state.balanceData);
  const { balance, transactions } = balanceData;
  const dispatch = useDispatch();

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(fetchUserData(currentUser.id));
    }
  }, [currentUser, dispatch]);

  const handleSubmitDeposit = async () => {
    try {
        const response = await axios.post('/bankingcore/deposits/request', {
            accountid: currentUser.id,
            amount: depositAmount
        });

        if (response.status === 200) {
            toast.success("Your deposit request has been submitted and is awaiting approval by an admin.");
            setDepositAmount('');
            setShowDepositModal(false);
        } else {
            toast.error("Error occurred while submitting deposit request.");
        }
    } catch (error) {
        console.error("Error while making deposit request:", error);
        toast.error("An unexpected error occurred. Please try again later.");
    }
};


  return (
    <div className="flex h-screen relative"> 

      <div className="flex flex-col flex-1 bg-gray-100 px-8 py-6">
        <div className="border-b pb-4 mb-8">
          <h2 className="text-2xl font-bold">Balance</h2>
          <p className="text-4xl font-bold text-blue-500">${balance.toFixed(2)}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Previous Operations</h2>
          {transactions.length > 0 ? (
            <ul className="space-y-4">
              {transactions.map((operation, index) => (
                <li key={index} className="p-4 bg-white shadow-md rounded-md flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold">${operation.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-400">{new Date(operation.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <span className={`px-4 py-1 rounded text-white text-sm ${operation.type === "DEPOSIT" ? "bg-red-500" : "bg-green-500"}`}>
                    {operation.type}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No operations found.</p>
          )}
        </div>
      </div>

      <button 
        onClick={() => setShowDepositModal(true)}
        className="fixed bottom-10 right-80 w-16 h-16 bg-blue-500 text-white text-5xl flex items-center justify-center rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-10"
        >
        +
      </button>

      {showDepositModal && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-md shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Make a Deposit</h2>
            <input
              type="text"
              placeholder="Enter deposit amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="border rounded-md p-2 w-full mb-4"
            />
            <button onClick={handleSubmitDeposit} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Submit
            </button>
            <button onClick={() => setShowDepositModal(false)} className="bg-gray-300 ml-4 p-2 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center items-center bg-gray-300 w-1/4 p-8">
        <FundTransferForm />
      </div>
    </div>
  );
};

export default Dashboard;
