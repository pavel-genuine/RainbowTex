import React from "react";
import SideBar from "./SideBar";
import UserList from "./UserList";


const Dashboard = () => {

    return (
        <div className='py-16 relative '>

            <div className='mx-auto  w-[100%]  md:grid grid-cols-12 '>
                <SideBar></SideBar>
                <div className="sm:mx-24 lg:mx-5 col-span-10 w-[95%] px-[10%] md:w-[100%]">

                    <label htmlFor='my-drawer-2' tabindex="1" class="btn btn-ghost lg:hidden text-[brown]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>

                    <div class="space-y-4 ">
                        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                        <div class="drawer-content">
                            <h2 className="text-2xl text-[#e50914] font-bold  ">Welcome to Admin Dashboard</h2>
                        </div>

                       
                            <UserList></UserList>
                       
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
