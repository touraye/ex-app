import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import transactionReducer from '../features/transaction/transactionSlice'

export const store = configureStore({
  reducer: {    
    auth: authReducer,
    user: userReducer,
    transaction: transactionReducer,
  },
});
