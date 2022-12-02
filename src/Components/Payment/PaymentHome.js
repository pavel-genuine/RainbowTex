import React from 'react'
import { base_url } from '../../api/api';

const PaymentHome = () => {
    return (
        <div className='bg-slate-800  text-slate-200 '>
            <div className=' mx-auto md:w-[90%] md:flex  md:space-x-5'>
                <div className='px-5 py-10 rounded-md border hover:border-slate-400 border-slate-600 space-y-2 drop-shadow-2xl'>
                    <h1 className='text-xl font-semibold'>Freemium</h1>
                    <p className='text-5xl font-semibold'>No fees.</p>
                    <p className='text-md font-semibold'>Good Video Quanlity.</p>

                    <p className='text-md font-semibold'>7 Days Advertisement Free Watching.</p>
                    <p className='text-md font-semibold'>Watch on TV, Computer, Phone & Tablet.</p>
                    <p className='text-md font-semibold'>Advertisement : Yes.</p>
                    <button className='btn btn-error btn-sm rounded-full normal-case'>Choose</button>
                </div>
                <div className='px-5 py-10 rounded-md border hover:border-slate-400 border-slate-600 space-y-2 drop-shadow-2xl'>      
                              <h1 className='text-2xl font-semibold'>Premium</h1>
                    <span className='text-5xl font-semibold'>10$</span> <span>/ mo.</span>
                    <p className='text-md font-semibold'>Best Video Quanlity.</p>
                    <p className='text-md font-semibold'>Unlimited Advertisement Free Watching.</p>

                    <p className='text-md font-semibold'>Watch on TV, Computer, Phone & Tablet.</p>
                    <p className='text-md font-semibold'>Advertisement : No.</p>
                    <button className='btn btn-sm btn-error rounded-full normal-case'
                    onClick={async () => {
                        const x = window.open(
                            `${base_url}/pay`,
                            "ModalPopUp",

                            "toolbar=no," +

                            "scrollbars=no," +

                            "location=no," +

                            "statusbar=no," +

                            "menubar=no," +

                            "resizable=0," +

                            "width=500," +

                            "height=600," +

                            "left = 490," +

                            "top=100"
                        );
                        x.focus();


                    }}
                    >Choose</button>
                </div>

            </div>
        </div>
    )
}

export default PaymentHome