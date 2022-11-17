import React, { useEffect } from 'react'

const UserList = () => {

    return (
        <div className=''>

            <p className='font-semibold my-2 text-xl underline underline-offset-2 '> Movies List</p>

            <div className='md:fle items-center'>

                <div className='flex items-center'>
                    <p className='font-semibold my-5 text-lg '>Total Movies Uploaded : {`movies.length`} </p>

                    <div className="flex space-x-2 overflow-hidden mx-4 mb-4 ">
                        <img className="inline-block h-10 w-10 rounded-full" media="(min-width:20px)" srcset="https://i.ibb.co/0Z2YqQp/20200817-055052.jpg" />
                        <img className="inline-block h-10 w-10 rounded-full " src="https://i.ibb.co/0ycQhqS/20201119-150836.jpg" alt="" />
                        <img className="inline-block h-10 w-10 rounded-full " src="https://res.cloudinary.com/pavel-genuine/image/upload/v1659796320/Photos/wu5ibh8i76k4mghenbwb.jpg" alt="" />
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </div>
                </div>


                <div className='flex items-center'>
                    <p className='font-semibold my-5 text-lg '>Total Users : {`users.length`} </p>

                    <div className="flex space-x-2 overflow-hidden mx-4 mb-4 ">
                        <img className="inline-block h-10 w-10 rounded-full" media="(min-width:20px)" srcset="https://i.ibb.co/0Z2YqQp/20200817-055052.jpg" />
                        <img className="inline-block h-10 w-10 rounded-full " src="https://i.ibb.co/0ycQhqS/20201119-150836.jpg" alt="" />
                        <img className="inline-block h-10 w-10 rounded-full " src="https://res.cloudinary.com/pavel-genuine/image/upload/v1659796320/Photos/wu5ibh8i76k4mghenbwb.jpg" alt="" />
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </div>
                </div>


            </div>


            <div style={{ overflowX: 'auto' }}>
                <table class="shadow-lg table-auto overflow-x-scroll overflow-auto w-full mt-5">
                    <thead className='text-white'>
                        <tr>
                            <th class="bg-slate-700 border border-[brown] text-left px-8 py-4">Movie Title</th>
                            <th class="bg-slate-700 border border-[brown] text-left px-8 py-4">IMDb Rating</th>
                            <th class="bg-slate-700 border border-[brown] text-left px-8 py-4">Release Date</th>
                            <th class="bg-slate-700 border border-[brown] text-left px-8 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-[brown] px-8 py-4">AAAAA</td>
                            <td class="border border-[brown] px-8 py-4">5.6</td>
                            <td class="border border-[brown] px-8 py-4">09-11-22</td>
                            <td class="border border-[brown] px-8 py-4 ">
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
                        </tr>
                        <tr>
                            <td class="border border-[brown] px-8 py-4">BBBBB</td>
                            <td class="border border-[brown] px-8 py-4">5</td>
                            <td class="border border-[brown] px-8 py-4">10-11-22</td>
                            <td class="border border-[brown] px-8 py-4 ">
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
                        </tr>
                        <tr>
                            <td class="border border-[brown] px-8 py-4">XXXX</td>
                            <td class="border border-[brown] px-8 py-4">4</td>
                            <td class="border border-[brown] px-8 py-4">11-11-22</td>
                            <td class="border border-[brown] px-8 py-4 ">
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
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserList