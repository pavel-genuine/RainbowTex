import React, { useEffect } from "react";
import DropDown from "../DropDown";
import SideBar from "../SideBar";
import MovieList from "./MovieList";


const DashboardHome = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='py-16 min-h-screen relative bg-[#181818] text-slate-200'>

            <div className='mx-auto w-[100%] pt-[.7%]  md:grid grid-cols-12 '>
                <SideBar></SideBar>
                <div className=" lg:mx-5 col-span-10 w-[100%] px-[5%] md:px-[10%] md:w-[100%]">
                    <DropDown></DropDown>
                    <div class="space-y-4 ">
                        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                        <div class="drawer-content">

                            <h2 className="text-2xl font-bold ">Welcome to Admin Dashboard</h2>
                        </div>


                        <MovieList></MovieList>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;

