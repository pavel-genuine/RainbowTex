import { configureStore } from '@reduxjs/toolkit';
import userListReducer from '../redux/features/usersSlice';
import signUpReducer from '../redux/features/signUpSlice';
import signInReducer from '../redux/features/signInSlice';
import publishPostReducer from '../redux/features/postSlice';

export const store = configureStore({
  reducer: {
    userList:userListReducer,
    signUp:signUpReducer,
    signIn:signInReducer,
    publishPost:publishPostReducer,
  },
});
