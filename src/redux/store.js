import { configureStore } from '@reduxjs/toolkit';
import userListReducer from './features/usersSlice';
import signUpReducer from './features/authSection/signUpSlice';
import signInReducer from './features/authSection/signInSlice';
import publishPostReducer from './features/postSection/postSlice';
import categoryReducer from './features/categorySlice'
import postVideoReducer from './features/postSection/postVideoSlice'
import videoCoverReducer from './features/postSection/videoCoverSlice'
import ThumbnailReducer from './features/postSection/thumbnailSlice'
import PostCategoryReducer from './features/postSection/postCategorySlice'
import PostTextReducer from './features/postSection/postTextSlice'

export const store = configureStore({
  reducer: {
    userList:userListReducer,
    signUp:signUpReducer,
    signIn:signInReducer,
    categoty:categoryReducer,
    publishPost:publishPostReducer,
    postVideo:postVideoReducer,
    postCategor:PostCategoryReducer,
    postVideoCover:videoCoverReducer,
    postThumbnail:ThumbnailReducer,
    postText:PostTextReducer
  },
});
