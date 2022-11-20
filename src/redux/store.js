import { configureStore } from '@reduxjs/toolkit';
import { signInUser } from '../Components/api/api';
import userListReducer from '../reducers/usersReducer';
import signUpReducer from '../reducers/signUpReducer';
import signInReducer from '../reducers/signInReducer';

export const store = configureStore({
  reducer: {
    userList:userListReducer,
    signUp:signUpReducer,
    signIn:signInUser,
  },
});
