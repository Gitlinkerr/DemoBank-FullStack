import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/Reducers';
import thunk from 'redux-thunk';

 const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default Store;

