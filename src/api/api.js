import axios from 'axios';
const base_url = 'https://jucundu-server.onrender.com/api';

//auth section
export const signUpUser = (user) => axios.post(`${base_url}/auth/register`, user);
export const signInUser = (user) => axios.post(`${base_url}/auth/login`, user);
export const googleAuth = (user) => axios.get(`${base_url}/auth/google`);

export const userList = () => axios.get(`${base_url}/admin/userlist`);

// category section
export const createCategory = (data) => axios.post(`${base_url}/category`,data)
export const getAllCategories = () =>axios.get(`${base_url}/category`,)
export const updateCategory =(data)=>axios.patch(`${base_url}/category`,data)
export const deleteCategory =(data)=>axios.delete(`${base_url}/category/`,data)

//post section
export const createPost = (post) => axios.post(`${base_url}/post`,post)
export const uploadVideo = (video) =>axios.post(`${base_url}/post/upload_video`,video)
export const getAllPosts =()=>axios.get(`${base_url}/post`)
export const getSinglePost =(id)=>axios.get(`${base_url}/single/post/${id}`)
export const deletePost =(id)=>axios.delete(`${base_url}/post/admin/${id}?removeMedia=true`)
export const addPostToCategory=(data)=> axios.patch(`${base_url}/post/admin/add_post_to_category`,data)
export const removeCategoryFromPost =(data) =>axios.patch(`${base_url}/post/admin/remove_category_from_post`,data)
export const addThumbnail =(data)=>axios.patch(`${base_url}/post/admin/add_thumbnail`, data)
export const removeThumbnail =(data)=>axios.patch(`{base_url}/post/admin/remove_thumbnail`,data)
export const addVideoCoverPhoto =(data)=>axios.patch(`${base_url}/add_video_cover`,data)
export const removeVideoCoverPhoto =(data)=>axios.patch(`${base_url}/remove_video_cover`,data)
export const updateNonMediaContent =(data)=>axios.patch(`${base_url}/post/admin/change`,data)
export const addVideo =(data)=>axios.patch(`${base_url}/post/admin/add_video`,data)
export const addVideoCopy =(data)=>axios.patch(`${base_url}/post/admin/add_video`,data)
export const removeVideos =(data)=>axios.patch(`${base_url}/admin/remove_videos`,data)