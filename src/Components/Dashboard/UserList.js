import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../reducers/usersReducer';

const UserList = () => {

    const { isLoading, error, userList } = useSelector(state => state?.userList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())

        console.log('userlist', userList);
        console.log('error', error);
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className=''>

            <p className='font-semibold my-2 text-xl underline underline-offset-2 text-[navy]'> Users List</p>
            <div className='flex'>
                {<p className='font-semibold my-2 text-lg text-[navy]'>Total Users: {userList?.length} </p>
                }
                {
                    <div className="flex -space-x-2 overflow-hidden mx-4 mb-4">
                        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-[black]" media="(min-width:20px)" srcset="https://i.ibb.co/0Z2YqQp/20200817-055052.jpg" />
                        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-[black]" src="https://i.ibb.co/0ycQhqS/20201119-150836.jpg" alt="" />
                        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-[black]" src="https://res.cloudinary.com/pavel-genuine/image/upload/v1659796320/Photos/wu5ibh8i76k4mghenbwb.jpg" alt="" />
                    </div>
                }
                {<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>}
            </div>

            <div class='overflow-x'>
                <section>
                    <div className='grid grid-cols-5  lg:gap-4 content-center overflow-x-scroll md:overflow-x-auto  gap-4'>
                        <h2 className='lg:text-xl text-center lg:font-bold grid content-center mb-8 '>Name</h2>
                        <h2 className='lg:text-xl text-center lg:font-bold grid content-center mb-8'>Email</h2>
                        <h2 className='lg:text-xl text-center lg:font-bold grid content-center mb-8'>Subscription Plan</h2>
                        <h2 className='lg:text-xl text-center lg:font-bold grid content-center mb-8'>Subscribed At</h2>
                        <h2 className='lg:text-xl text-center lg:font-bold grid content-center mb-8'>Action</h2>
                    </div>
                    <div>
                        {
                            userList.map(data => (
                                <>
                                    <div className='grid grid-cols-6 lg:mx-48 lg:gap-4 content-center'>
                                        <h2 className='font-bold text-gray-500 text-center grid content-center'>{data.name}</h2>
                                        <h2 className='border text-center grid content-center bg-green-100'>{data.email}</h2>
                                        <h2 className='border text-center grid content-center bg-green-100'>{data.subscriptionPlan}</h2>
                                        <h2 className='border text-center grid content-center bg-green-100'>{data.subscribedAt}</h2>
                                        <h2 className='border text-center grid content-center bg-green-100'>{data.DC4}</h2>
                                        <h2 className='border text-center grid content-center bg-green-100 flex'>
                                            <span title='edit'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-10 cursor-pointer text-[blue]">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                            </span>
                                            <span title='remove'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer text-[red]">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </span></h2>
                                    </div>
                                    <div class="divider w-8/12 mx-auto"></div>
                                </>
                            ))
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}

export default UserList