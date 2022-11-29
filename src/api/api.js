import axios from 'axios';
export const base_url = 'http://ec2-3-75-191-65.eu-central-1.compute.amazonaws.com:5000/api';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('loginToken')}`;

//auth section
export const signUpUser = (user) => axios.post(`${base_url}/auth/register`, user);
export const signInUser = (user) => axios.post(`${base_url}/auth/login`, user);
export const googleAuth = () => axios.get(`${base_url}/auth/google`);
export const logOut = () => axios.get(`${base_url}/auth/logout`,{
    headers:{
        Authorization:`Bearer ${localStorage.getItem('loginToken')}`
    }
});

export const userList = (params) => axios.get(`${base_url}/admin/userlist${params}`);
export const getTotalUsersNumber = () => axios.get(`${base_url}/admin/total_number_of_users`);

// category section
export const createCategory = (data) => axios.post(`${base_url}/category`,data)
export const getAllCategories = () =>axios.get(`${base_url}/category`,)
export const updateCategory =(data)=>axios.patch(`${base_url}/category`,data)
export const deleteCategory =(data)=>axios.delete(`${base_url}/category`,data,{
    headers:{
        Authorization:`Bearer ${localStorage.getItem('loginToken')}`
    }
})
export const homeCategory =()=>axios.get(`${base_url}/category/all_category_posts`)

//post section
export const createPost = (post) => axios.post(`${base_url}/post`,post)
export const uploadVideo = (video,option) =>axios.post(`${base_url}/post/upload_video`,video,option)
export const getAllPosts =(param)=>axios.get(`${base_url}/post${param}`)
export const getSinglePost =(id)=>axios.get(`${base_url}/post/single/${id}`)
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
export const getTotalPostsNumber=()=>axios.get(`${base_url}/post/total_numberof_posts`)
//feaured section
export const createfeatured = (post) => axios.post(`${base_url}/featured/add`,post)
export const getAllFeatured =()=>axios.get(`${base_url}/featured`)


// comment
export const addComment =(data)=>axios.patch(`${base_url}/post/add_comment`,data)
export const approveComment =(data)=>axios.patch(`${base_url}/post/approve_comment`,data)
export const removeComment =(data)=>axios.patch(`${base_url}/post/remove_comment`,data)
export const editComment =(data)=>axios.patch(`${base_url}/post/edit_comment`,data)
export const addRating =(data)=>axios.patch(`${base_url}/post/rating`,data)

