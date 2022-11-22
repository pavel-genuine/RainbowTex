import React from 'react'
import useUserList from '../../Shared/useUserList';

const UsersTable = () => {

    const {userList} =useUserList()

    console.log(userList,'useUsers');

    // if (isLoading) {
    //     return <p>Loading...</p>
    // }

    return (
        <div className=''>

        <p className='font-semibold my-2 text-xl underline underline-offset-2 '> Users List</p>
        <p className='font-semibold my-10 bg-slate-600 px-3 md:w-[25%]  py-2 text-lg  '>Total Users : {userList.length} </p>

        <div style={{ overflowX: 'auto' }}>
            <table class="shadow-lg table-auto overflow-x-scroll overflow-auto w-full">
                <thead className='text-white'>
                    <tr className='bg-[brown]'>
                        <th class=" border border-[#181818] text-left px-8 py-4">Name</th>
                        <th class=" border border-[#181818] text-left px-8 py-4">Email</th>
                        <th class=" border border-[#181818] text-left px-8 py-4">Subscription Plan</th>
                        <th class=" border border-[#181818] text-left px-8 py-4">Subscribed At</th>
                        <th class=" border border-[#181818] text-left px-8 py-4">Action</th>
                    </tr>
                </thead>
                <tbody className='bg-[#26282b]'>
                    {
                        userList.map(user=><tr>
                            <td class="border border-[#181818] px-8 py-4">{user?.name}</td>
                            <td class="border border-[#181818] px-8 py-4">{user?.email}</td>
                            <td class="border border-[#181818] px-8 py-4">{user?.subscription_plan}</td>
                            <td class="border border-[#181818] px-8 py-4">{user?.updatedAt}</td>
                            <td class="border border-[#181818] px-8 py-4 ">
                                <p className='flex'>
                                    <span title='edit'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-10 cursor-pointer text-[blue]">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </span>
                                    <span title='remove'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer text-[red]">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </span>
                                </p>
    
                            </td>
                        </tr>)
                    }
                    {/* <tr>
                        <td class="border border-[#181818] px-8 py-4">BBBBB</td>
                        <td class="border border-[#181818] px-8 py-4">Email2</td>
                        <td class="border border-[#181818] px-8 py-4">paid</td>
                        <td class="border border-[#181818] px-8 py-4">10-11-22</td>
                        <td class="border border-[#181818] px-8 py-4 ">
                            <p className='flex'>
                                <span title='edit'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-10 cursor-pointer text-[blue]">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </span>
                                <span title='remove'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer text-[red]">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </span>
                            </p>
                        </td>
                    </tr> */}
                    {/* <tr>
                        <td class="border border-[#181818] px-8 py-4">XXXX</td>
                        <td class="border border-[#181818] px-8 py-4">Email3</td>
                        <td class="border border-[#181818] px-8 py-4">trial</td>
                        <td class="border border-[#181818] px-8 py-4">11-11-22</td>
                        <td class="border border-[#181818] px-8 py-4 ">
                            <p className='flex'>
                                <span title='edit'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-10 cursor-pointer text-[blue]">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </span>
                                <span title='remove'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer text-[red]">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </span>
                            </p>

                        </td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default UsersTable