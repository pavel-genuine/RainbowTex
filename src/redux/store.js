import { configureStore } from '@reduxjs/toolkit';
import userListReducer from './features/usersSlice';
import signUpReducer from './features/authSection/signUpSlice';
import signInReducer from './features/authSection/signInSlice';
import publishPostReducer from './features/postSection/postSlice';
import allPostReducer from './features/postSection/allPostSlice';
import singlePostReducer from './features/postSection/postSlice';
import allCategoriesReducer from './features/categorySlice'
import postVideoReducer from './features/postSection/postVideoSlice'
import videoCoverReducer from './features/postSection/videoCoverSlice'
import ThumbnailReducer from './features/postSection/thumbnailSlice'
import PostCategoryReducer from './features/postSection/postCategorySlice'
import PostTextReducer from './features/postSection/postTextSlice'
import postDeleteReducer from './features/postSection/postSlice'
import getFeaturedReducer from './features/featuredPost/featuredPostSlice'
import addFeaturedReducer from './features/featuredPost/featuredPostSlice'
import createCategoryReducer from './features/categorySlice'
import addCommentReducer from './features/commentSlice'
import approveCommentReducer from './features/commentSlice'
import removeCommentReducer from './features/commentSlice'
import editCommentReducer from './features/commentSlice'

export const store = configureStore({
  reducer: {
    userList:userListReducer,
    signUp:signUpReducer,
    signIn:signInReducer,
    allCategories:allCategoriesReducer,
    categoryCreate:createCategoryReducer,
    publishPost:publishPostReducer,
    allPosts:allPostReducer,
    singlePost:singlePostReducer,
    postVideo:postVideoReducer,
    postCategor:PostCategoryReducer,
    postVideoCover:videoCoverReducer,
    postThumbnail:ThumbnailReducer,
    postText:PostTextReducer,
    deletePost:postDeleteReducer,
    allFeatured:getFeaturedReducer,
    addFeatured:addFeaturedReducer,
    commentAdding:addCommentReducer,
    commentApproving:approveCommentReducer,
    commentRemoving:removeCommentReducer,
    commentEditing:editCommentReducer

  },
});
