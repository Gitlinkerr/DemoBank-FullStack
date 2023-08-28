import React, { useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const DepositForm = () => {
  const [amountToDeposit, setAmount] = useState("");
  const currentUser = useSelector(state => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/bankingcore/deposits/request', {
        accountid: currentUser.id,
        amount: amountToDeposit
      });
      if (response.data) {
        toast.success("Deposit request submitted. Waiting for admin approval.");
        setAmount("");
      } else {
        toast.error("Failed to submit deposit request.");
      }
    } catch (error) {
      toast.error("Error occurred while making deposit.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input
          type="number"
          value={amountToDeposit}
          onChange={e => setAmount(e.target.value)}
        />
      </label>
      <button type="submit">Submit Deposit</button>
    </form>
  );
};

export default DepositForm;
