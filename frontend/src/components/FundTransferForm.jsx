import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleFundTransfer } from '../actions/Actions';  
import 'react-toastify/dist/ReactToastify.css';

const FundTransferForm = () => {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');

  const handleRecipientChange = event => {
    setRecipientId(event.target.value);
  };

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
     dispatch(handleFundTransfer(currentUser.id, recipientId, amount));
     setRecipientId('');
     setAmount('');
  };

  return (
    <div className="p-8 bg-gray-200 rounded-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Transfer Funds</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Recipient ID:</label>
          <input type="text" value={recipientId} onChange={handleRecipientChange} className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-gray-700">Amount:</label>
          <input type="number" value={amount} onChange={handleAmountChange} className="w-full px-3 py-2 border rounded-md" />
        </div>

        <button type="submit" className="w-full px-3 py-2 text-white bg-blue-500 rounded-md">Transfer</button>
      </form>
    </div>
  );
};

export default FundTransferForm;
