import { Autocomplete, CircularProgress, createTheme, TextField, ThemeProvider } from '@mui/material';
import { Input } from 'antd';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import './FindCars.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { type } from '@testing-library/user-event/dist/type';
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import useDrawerOpen from '../../../hooks/useDrawerOpen';
import { accessTokenPassenger } from '../../Authentication/AuthHome';

const FindCars = ({ open, setOpen }) => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [time, setTime] = React.useState();
    const [pickUp, setPickUp] = React.useState();
    const [destination, setDestination] = React.useState();

    // const { handleOpenDrawer,  } = useDrawerOpen()


    const places = ['Uttara', 'Gulshan', 'Mirpur', 'Dhanmondi', 'xxx', 'yyy', 'zzz', 'aaa']

    const onSubmit = async (data) => {
        !accessTokenPassenger && setOpen(true)
    }


    return (
        <div style={{ backgroundImage: `url(${'https://new-media.dhakatribune.com/en/uploads/2021/10/26/zakir-hossain.jpeg'})`, backgroundSize: 'cover' }}
            className='h-[65vh] md:h-[610px] mb-5 md:mb-10'>
            <div className=' md:pt-28 md:pl-40 bg-black bg-opacity-50 h-[65vh] md:h-[610px] w-[100%]'>
                <div className='bg-white md:w-[500px] pt-20 md:pt-0 md:h-[450px] h-[65vh]'>

                    <form className="flex  justify-center items-center flex-col relative" onSubmit={handleSubmit(onSubmit)}>


                        <div className='flex md:mt-16 mt-5  justify-center items-center flex-col space-y-8 w-[100%]'>

                            <div className="relative form-control bg-white rounded   flex boder justify-center items-center">
                                <Autocomplete
                                    className='w-[90vw] md:w-[350px]'
                                    id="combo-box-demo"
                                    options={places}
                                    // value={pickUp}
                                    onInputChange={(event, value) => { setPickUp(value) }}
                                    freeSolo
                                    renderInput={(params) => <TextField {...params} label="Pick-up point" />}
                                    type="text"
                                    {...register("pickup", {
                                        required: {
                                            // value: true,
                                            message: 'Required'
                                        }

                                    })}

                                />
                                <span className='absolute top-[15%] right-[10%]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 text-primary bg-[#52f15217] rounded-full p-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>

                                </span>
                            </div>
                            <div className="relative form-control bg-white rounded flex boder justify-center items-center ">
                                <Autocomplete
                                    className='w-[90vw] md:w-[350px]'
                                    id="combo-box-demo"
                                    options={places}
                                    // value={destination}
                                    onInputChange={(event, value) => { setDestination(value) }}
                                    freeSolo
                                    renderInput={(params) => <TextField {...params} label="Destination" />}
                                    type="text"
                                    {...register("destination", {
                                        required: {
                                            // value: true,
                                            message: 'Required'
                                        }

                                    })}
                                />

                                <span className='absolute top-[15%] right-[10%]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 text-primary bg-[#52f15217] rounded-full p-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                                    </svg>

                                </span>
                            </div>
                        </div>

                        <div className='my-8 relative form-control bg-white rounded flex boder justify-center items-center '>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    components={{
                                        OpenPickerIcon: AccessTimeIcon,
                                    }}
                                    className='w-[90vw] md:w-[350px]'
                                    label="Schedule The Trip"
                                    value={time}
                                    onChange={(newValue) => {
                                        // console.log(newValue.$d,'newtttt');
                                        setTime(newValue?.$d);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>

                            <span className='absolute top-[15%] right-[10%]'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 text-primary bg-[#52f15217] md:hidden rounded-full p-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>

                        </div>
                        <input className='w-[90vw] md:w-[350px] px-4  py-3 font-bold rounded  text-white bg-primary  cursor-pointer' type="submit" value="Find Cars" />
                    </form>
                </div>
            </div>
        </div>

    )
}

export default FindCars