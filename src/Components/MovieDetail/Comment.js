import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { commentEdit, commentRemove } from '../../redux/features/commentSlice';

const Comment = ({ item, postId }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [commentId, setCommentId] = useState()
    const { comment: removedComment } = useSelector(state => state?.commentRemoving)
    const { comment: editedComment } = useSelector(state => state?.commentEditing)
    const { rating } = useSelector(state => state?.ratingAdding)

    // console.log(movie);

    const dispatch = useDispatch()

    const onSubmit = (data) => {

        

        const comment = {
            postId: postId,
            commentId: item?._id,
            editedComment: data?.commentEdit,
            userId: localStorage.getItem('userId')
        }

        console.log(comment,'cmt');

        dispatch(commentEdit(comment))

        // const updatedComments = movie?.comments?.filter(item => item?._id != commentId);


        // const updatedComment = movie?.comments?.find(item => item?._id == commentId);



        // setRemainingCommennts(() => [...updatedComments, updatedComment])

        toast.success('Comment edited')

        setTimeout(() => {
            window.location.reload()
        }, 200);




    }

    const handleRemoveComment = (id) => {

        const data = {
            postId: postId,
            commentId: id
        }

        const confirmation = window.confirm('Are you sure to delete?');
        if (confirmation) {
            dispatch(commentRemove(data))

        }

        // console.log(data, 'rrr');
        // console.log(id, 'id');
        //

        // if (remainingCommennts.length == 1) {
        //     dispatch(commentRemove(data))
        //     // // setRemainingCommennts(() => [{ comment: null, _id: id }])
        //     return setTimeout(() => {
        //         window.location.reload()
        //     }, 200);
        // }



        setTimeout(() => {
            window.location.reload()
        }, 200);


        toast.success('Comment deleted')

    }

    return (
        <div key={item?._id}>
            <p className="font-medium flex items-center">
                <img className="w-8 h-8 rounded-full mr-2 border border-[brown]" src="https://i.ibb.co/vj0Ctmj/user.png" alt="" />{localStorage.getItem('email')} </p>
            <div className='flex items-center'>
                <p className='m-3 bg-slate-800 p-2 rounded'> {item?.comment}
                </p>

                <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                    <label className="modal-box relative bg-slate-800" htmlFor="">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="pt-10 space-y-2 pb-5 ">
                                <header className="font-semibold text-xl mb-5">Edit the comment here</header>
                                <div className="comments-container  border-y  py-4">
                                    <div>
                                        <p className="font-medium flex items-center"> <img className="w-8 h-8 rounded-full mr-2 border border-[brown]" src="https://i.ibb.co/vj0Ctmj/user.png" alt="" />{localStorage.getItem('email')} </p>

                                        <div className='grow-wrap'>
                                            <textarea
                                                required
                                                placeholder="Comment"
                                                id="text"
                                                minLength="2"
                                                // className="outline-0 pt-3 font-normal"
                                                className=" outline-0 p-3 font-normal  bg-slate-700 bg-opacity-50 my-5 rounded-lg  block w-full"
                                                {...register("commentEdit")}>
                                            </textarea>
                                            {/* {errors.comment && errors.comment.type === "required" && <span>This is required</span>}
{errors.comment && errors.comment.type === "minLength" && <span>minimum 2 characters</span>} */}
                                        </div>

                                        <input className="btn btn-xs bg-[brown] border-0 text-white " type="submit" value="Edit" />

                                    </div>
                                </div>
                            </div>
                        </form>  </label>
                </label>

                {

                    localStorage?.getItem('userId') == item?.userId &&

                    <div>
                        <div className="dropdown dropdown-hover">
                            <label tabIndex={0} className=" m-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow  rounded-box  bg-slate-600">
                                <li ><label htmlFor="my-modal-4">Edit<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                </label>
                                </li>

                                <li><a  onClick={(id) => handleRemoveComment(item?._id)} >Delete <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}

export default Comment