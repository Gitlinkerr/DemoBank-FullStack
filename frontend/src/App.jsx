import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, Provider } from 'react-redux'; 
import { ToastContainer } from 'react-toastify';
import Store from './redux/Store'; 
import { setToken } from './actions/Actions';
import { MainLayout } from './MainLayout ';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return (
    <Provider store={Store}>
      <Router>
        <MainLayout />
        <ToastContainer /> 
      </Router>
    </Provider>
  );
};

export default App;


