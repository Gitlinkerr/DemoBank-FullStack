import * as actionTypes from '../../../actions/admin/adminActionTypes';

const initialState = {
    users: [],
    userDetails: {},
    comments: [],
    pendingDeposits: []
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS:
            return { ...state, users: action.payload };

        case actionTypes.FETCH_COMMENTS: 
            return { ...state, comments: action.payload };

        case actionTypes.APPROVE_DEPOSIT:
            const transactionsForApprove = state.userDetails.transactions 
                ? state.userDetails.transactions.map(tx => 
                    tx.id === action.payload ? { ...tx, status: "Approved" } : tx
                )
                : [];

            return { 
                ...state, 
                userDetails: {
                    ...state.userDetails,
                    transactions: transactionsForApprove
                }
            };

        case actionTypes.REJECT_DEPOSIT:
            const transactionsForReject = state.userDetails.transactions 
                ? state.userDetails.transactions.map(tx => 
                    tx.id === action.payload ? { ...tx, status: "Rejected" } : tx
                )
                : [];

            return { 
                ...state, 
                userDetails: {
                    ...state.userDetails,
                    transactions: transactionsForReject
                }
            };

        case actionTypes.FETCH_PENDING_DEPOSITS_SUCCESS:
            return { ...state, pendingDeposits: action.payload };

        default:
            return state;
    }
};

export default adminReducer;
