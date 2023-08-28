import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, approveDeposit, rejectDeposit, fetchPendingDeposits } from '../../actions/admin/adminActions';
import { useNavigate } from 'react-router-dom'; 

function AdminDashboard() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
        const users = useSelector(state => state.admin.users);
    const pendingDeposits = useSelector(state => state.admin.pendingDeposits); 

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchPendingDeposits());
    }, [dispatch]);
        const handleNavigateToDownloadFiles = () => {
            navigate("/download-files");
        }

    return (
        <div className="bg-gray-100 p-10 min-h-screen">
<h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

<button 
    onClick={handleNavigateToDownloadFiles}
    className="bg-green-500 text-white px-4 py-1 rounded mb-6 hover:bg-green-600"
>
    Go to Download Files
</button>
            <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
            
            <div className="bg-white p-4 rounded-md shadow mb-8">
                <h3 className="text-xl font-semibold mb-4">Pending Deposits:</h3>
                <ul>
                    {pendingDeposits.map(deposit => (
                        <li key={deposit.depositId} className="mb-4">
                            <span className="font-medium">Deposit ID:</span> {deposit.depositId}
                            <p className="ml-4">
                                <span className="font-medium">Amount:</span> ${deposit.amount.toFixed(2)}
                            </p>
                            <div className="mt-2 ml-4">
                                <button 
                                    className="bg-blue-500 text-white px-4 py-1 rounded mr-2 hover:bg-blue-600"
                                    onClick={() => dispatch(approveDeposit(deposit.depositId))}
                                >
                                    Approve
                                </button>
                                <button 
                                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                    onClick={() => dispatch(rejectDeposit(deposit.depositId))}
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="bg-white p-4 rounded-md shadow">
                {users.map(user => (
                    <div key={user.accountId} className="border-b-2 pb-4 mb-4">
                        <h3 className="text-xl font-semibold mb-2">{user.firstname} {user.lastname}</h3>
                        <p className="mb-2"><span className="font-medium">Email:</span> {user.email}</p>
                        <p className="mb-2"><span className="font-medium">Balance:</span> ${user.balance.toFixed(2)}</p>
                        <div className="mb-2">
                            <h4 className="text-lg font-semibold mb-2">Transactions:</h4>
                            <ul className="pl-4">
                                {user.transactions.map(tx => (
                                    <li key={tx.id} className="mb-2">
                                        <span className="font-medium">{tx.type}</span> of amount: ${tx.amount.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Comments:</h4>
                            <ul className="pl-4">
                                {user.comments.map((comment, index) => (
                                    <li key={index} className="mb-2">{comment}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;
