import { instance as axiosConfig } from '../../config/axiosConfig'; 
import * as actionTypes from './adminActionTypes';

export const fetchUsers = () => async dispatch => {
    try {
        const response = await axiosConfig.get('http://localhost:8080/api/v1/bankingcore/listofaccounts');
        dispatch({ type: actionTypes.FETCH_USERS, payload: response.data });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

export const approveDeposit = (transactionId) => async dispatch => {
    try {
        await axiosConfig.post(`http://localhost:8080/api/v1/bankingcore/deposits/approve/${transactionId}`);
        dispatch({ type: actionTypes.APPROVE_DEPOSIT, payload: transactionId });
        
        // Fetch updated data after approving a deposit
        dispatch(fetchPendingDeposits());
        dispatch(fetchUsers());

    } catch (error) {
        console.error("Error approving deposit:", error);
    }
};

export const rejectDeposit = (transactionId) => async dispatch => {
    try {
        await axiosConfig.post(`http://localhost:8080/api/v1/bankingcore/deposits/reject/${transactionId}`);
        dispatch({ type: actionTypes.REJECT_DEPOSIT, payload: transactionId });
        
        dispatch(fetchPendingDeposits());
        dispatch(fetchUsers());

    } catch (error) {
        console.error("Error rejecting deposit:", error);
    }
};

export const fetchPendingDeposits = () => async dispatch => {
    try {
        const response = await axiosConfig.get('http://localhost:8080/api/v1/bankingcore/deposits/getPendingDeposits');
        if (response.data) {
            dispatch({
                type: actionTypes.FETCH_PENDING_DEPOSITS_SUCCESS, 
                payload: response.data
            });
        } else {
            throw new Error('Failed to fetch pending deposits');
        }
    } catch (error) {
        dispatch({
            type: actionTypes.FETCH_PENDING_DEPOSITS_FAIL, 
            payload: error.message
        });
    }
};

export const fetchAllDocuments = async () => {
    try {
        const response = await axiosConfig.get("http://localhost:8000/api/v1/Files/getAllFiles");
        return response.data;
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw error;
    }
};

export const downloadDocument = async (documentId) => {
    try {
        const response = await axiosConfig.get(`http://localhost:8000/api/v1/Files/downloadFile/${documentId}`, {
            responseType: 'blob'
        });
        return response;
    } catch (error) {
        console.error("Error downloading the file:", error);
        throw error;
    }
};

