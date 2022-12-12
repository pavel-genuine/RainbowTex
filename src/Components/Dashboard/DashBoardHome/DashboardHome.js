import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getTotalPostsNumber, getTotalUsersNumber } from "../../../api/api";

const DashboardHome = () => {

    const [postsNumber, setPostsNumber] = useState(0)
    const [usersNumber, setUsersNumber] = useState(0)

    useEffect(() => {
        window.scrollTo(0, 0)

        const fetchPostsNumber = async () => {
            const { data } = await getTotalPostsNumber()

            const totalPosts = data?.totalNumberOfPosts
            setPostsNumber(() => totalPosts)
            // console.log('res',data?.totalNumberOfPosts);
            // console.log('post',postsNumber);
        }
        fetchPostsNumber()
        const fetchUsersNumber = async () => {
            const { data } = await getTotalUsersNumber()

            setUsersNumber(() => data)

        }
        fetchUsersNumber()

    }, [postsNumber, usersNumber])

    return (
        <div className='py-16 min-h-screen relative bg-[#181818] text-slate-200'>

            <div className='mx-auto w-[100%] pt-[.7%] md:grid grid-cols-12  '>
                <SideBar index={1} color={'[#e50914]'}></SideBar>
                <div className=" col-span-10 w-[100%] px-[5%] mt-10 md:px-[10%] ">
         
                    <div class="space-y-4 ">
                        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                        <div class="drawer-content">

                            <h2 className="text-2xl font-bold mb-5 ">Welcome to Admin Dashboard</h2>
                        </div>

                        <img className="md:w-40 w-24" src={"https://i.ibb.co/vj0Ctmj/user.png"} alt="" />
                        <h2 className="font-bold text-2xl">Admin :   <span className='text-salte-200'>
                            {window.localStorage?.getItem('name')}
                        </span></h2>
                        <div className='md:flex items-center'>
                            <p className='font-semibold my-5 bg-slate-600 px-3 py-2 md:mr-20 text-lg rounded-lg'>Total Movies Uploaded : {postsNumber} </p>
                            <p className='font-semibold my-5 bg-slate-600 px-3 py-2 text-lg rounded-lg'>Total Users : {usersNumber} </p>
                        </div>

                        <div>

                            {/* 
                <AreaChart
                    width={1000}
                    height={700}
                    data={movies}
                    margin={{
                        top: 10,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="likelihood" />
                    <YAxis dataKey="intensity" />
                    <Tooltip />

                    <Area type="monotone" dataKey="name" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="rating" stackId="1" stroke="#8884d8" fill="#8884d8" />

                    <Area type="monotone" dataKey="release" stackId="1" stroke="#ffc658" fill="#ffc658" />
                    <Legend style={{ buttom: 0, right: 0 }} />

                </AreaChart> */}
                        </div>

                    </div>
                </div>




            </div>



        </div>
    );
};

export default DashboardHome;

