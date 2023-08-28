import { FETCH_USER_DATA_FAILURE,FETCH_USER_DATA_START,FETCH_USER_DATA_SUCCESS } from "../../actions/ActionTypes";
const initialState = {
    balance: 0,
    transactions: [],
    loading: false,
    error: null
  };
  
   const balanceReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_DATA_START:
        return { ...state, loading: true, error: null };
      case FETCH_USER_DATA_SUCCESS:
        return { ...state, loading: false, balance: action.payload.balance, transactions: action.payload.transactions };
      case FETCH_USER_DATA_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  export default balanceReducer;
  