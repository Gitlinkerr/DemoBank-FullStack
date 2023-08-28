import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './loginReducer';
import signUpReducer from './SignUpReducer';
import jwtTokenReducer from './JwtTokenReducer';    
import balanceReducer from './balanceReducer';
import userReducer from './userReducer';
import adminReducer from './admin/adminReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  admin: adminReducer,
  balanceData: balanceReducer,
  signUp: signUpReducer,
  jwtToken: jwtTokenReducer,
  message: messageReducer,
});

export default rootReducer;
