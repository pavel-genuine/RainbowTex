import { configureStore } from '@reduxjs/toolkit';
import userListReducer from './features/usersSlice';
import signUpReducer from './features/authSection/signUpSlice';
import signInReducer from './features/authSection/signInSlice';
import publishPostReducer from './features/postSection/postSlice';

export const store = configureStore({
  reducer: {
    userList:userListReducer,
    signUp:signUpReducer,
    signIn:signInReducer,
    publishPost:publishPostReducer,
  },
});
