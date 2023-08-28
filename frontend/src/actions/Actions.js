import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {instance as axios} from '../config/axiosConfig';
import { SIGNUP_ERROR, SET_TOKEN } from './ActionTypes';
import { FETCH_USER_DATA_START, FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_FAILURE } from './ActionTypes';
import { SET_USER_DATA, CLEAR_USER_DATA, SET_USER_ERROR, USER_UPDATED } from './ActionTypes';

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});
export const updateAccountSuccess = (accountData) => ({
  type: 'UPDATE_ACCOUNT_SUCCESS',
  payload: accountData,
});

export const updateAccountFailure = (errorMessage) => ({
  type: 'UPDATE_ACCOUNT_FAILURE',
  payload: errorMessage,
});


export const login = (email, password, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', { email, password });
      
      if(response.data.token) {
        localStorage.setItem('token', response.data.token);
        dispatch(setToken(response.data.token));

        const { token, ...userData } = response.data;
        console.log("User Details:", userData);

        dispatch(setUserData(userData)); 

        toast.success('Login successful!', { autoClose: 3000 });

        if (userData.role === 'ADMIN') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
        
      } else {
        dispatch(loginFailure("Token not received"));
      }
      
      return response;
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };
};



export const loginSuccess = (userData) => ({
  type: 'LOGIN_SUCCESS',
  payload: userData,
});

export const loginFailure = (errorMessage) => ({
  type: 'LOGIN_FAILURE',
  payload: errorMessage,
});

export const signUp = (user, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', user);

      console.log(response.data); 
            toast.success('Registration successful!', { autoClose: 3000 });

            // Redirect to the dashboard
            navigate('/loginPage');
            
    } catch (error) {
      console.log(error.response.data); 
      console.log(error?.response?.data);
      dispatch({ type: SIGNUP_ERROR, payload: error?.response?.data });
    }

  };
  
  
};

export const updateUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put('http://localhost:8080/api/v1/auth/updateUser', userData); 

            if (response.status === 200) {
              dispatch(updateAccountSuccess(response.data));
              dispatch(setUserData(response.data));  
              toast.success('Account updated successfully!', { autoClose: 3000 });
          } else {
                dispatch(updateAccountFailure("Failed to update account."));
            }
        } catch (error) {
            dispatch(updateAccountFailure(error.message));
            toast.error('Error updating account!', { autoClose: 3000 });
        }
    }
};
export const fetchUserDataSuccess = (userData) => ({
  type: 'FETCH_USER_DATA_SUCCESS',
  payload: userData,
});

export const fetchUserDataFailure = (errorMessage) => ({
  type: 'FETCH_USER_DATA_FAILURE',
  payload: errorMessage,
});

export const fetchUserData = (userId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER_DATA_START });

    try {
      const response = await axios.get("http://localhost:8080/api/v1/bankingcore/GetBalanceAndOperations", {
        params: {
          identifiant: Number(userId)  
        }
      });
      const { balance, transactions } = response.data;

      dispatch({ type: FETCH_USER_DATA_SUCCESS, payload: { balance, transactions } });
    } catch (error) {
      console.log("Error fetching user data:", error);
      dispatch({ type: FETCH_USER_DATA_FAILURE, error });
    }
  };
};


export const setUserData = (userData) => ({
    type: SET_USER_DATA,
    payload: userData
});

export const userUpdated = (updatedData) => ({
    type: USER_UPDATED,
    payload: updatedData
});

export const clearUserData = () => ({
    type: CLEAR_USER_DATA
});

export const setUserError = (error) => ({
    type: SET_USER_ERROR,
    payload: error
});

export const logout = (navigate) => {
  return (dispatch) => {
    const token = localStorage.getItem('token');  

    if (token) {
         axios.post('http://localhost:8080/api/v1/auth/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })};
    localStorage.removeItem('token');  
    navigate('/loginPage');
    dispatch({ type: 'logout' }); 
    dispatch({ type: CLEAR_USER_DATA });  
  };
};



export const handleFundTransfer = (SourceAccountId, RecipientId, Amount) => async (dispatch) =>  { 
    try {
      const response = await axios.post('http://localhost:8080/api/v1/bankingcore/fundTransfer', {
        sourceAccountId: SourceAccountId,
        targetAccountId: RecipientId,
        amount: Amount
      });

      if (response.status === 200) {
        toast.success('Funds transferred successfully!', {
          position: toast.POSITION.BOTTOM_RIGHT
        });

        dispatch(fetchUserData(SourceAccountId));

      } else if (response.status === 400) { 
        toast.error('Invalid recipient ID!', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        toast.error('Failed to transfer funds!', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    } catch (error) {
      console.error('Error transferring funds:', error);
      toast.error('Error transferring funds!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };




export const fetchCommentsAction = (userId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/bankingcore/comment/getcomments/${userId}`);
        if (response.data) {
          dispatch({ type: 'FETCH_COMMENTS_SUCCESS', payload: response.data });        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

export const postCommentAction = (userId, message) => async (dispatch) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/bankingcore/comment/writecomment/${userId}`, {
            message: message
        });
        if (response.status === 200) {
            dispatch(fetchCommentsAction(userId)); // Refresh the comments list
        }
    } catch (error) {
        console.error('Error writing message:', error);
    }
};




