import React, { useEffect } from "react";
import SideBar from "../SideBar";
import UsersTable from "./UsersTable";


const UserList = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='py-16 min-h-screen relative bg-[#181818] text-slate-200'>

            <div className='mx-auto w-[100%] pt-[.7%]  md:grid grid-cols-12 '>
                <div className="mx-7 md:hidden">
                </div>
                <SideBar index={3} color={'[#e50914]'}></SideBar>
                <div className=" lg:mx-5 col-span-10 w-[100%] px-[5%] md:px-[10%] md:w-[100%]">

                    <div class="mt-14 ">
                        
                        <UsersTable></UsersTable>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList

