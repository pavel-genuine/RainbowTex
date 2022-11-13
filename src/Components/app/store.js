import { configureStore } from '@reduxjs/toolkit';
import userListReducer from '../reducers/usersReducer';

export const store = configureStore({
  reducer: {
    userList:userListReducer,
  },
});
