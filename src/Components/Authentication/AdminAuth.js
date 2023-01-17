
import { Box, Button, Tab, Tabs, TextField, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { adminLogin, adminRegister } from '../../api/api';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AdminAuth = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [tabValue, setTabValue] = React.useState(0);
    const handleChangeTabs = (event, newValue) => {
        setTabValue(newValue);
    };
    const onSubmitLogin = async (data) => {

        const { data: res } = await adminLogin(data)

        console.log(res, 'res');

    }
    const onSubmitRegister = async (data) => {

        const { data: res } = await adminRegister(data)
        console.log(res, 'res');

    }


    return (
        <div className='pt-20 w-[100vw] md:w-[400px] mx-auto'>


            <Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleChangeTabs} aria-label="basic tabs example" sx={{ backgroundColor: '#f7f7f7' }}>
                        <Tab className='normal-case' disableRipple label="Login" {...a11yProps(0)} />
                        <Tab className='normal-case' disableRipple label="Register" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <Box>
                    <TabPanel value={tabValue} index={0} className='flex justify-center'>
                        <div>
                            <form className=" flex  justify-center items-center flex-col relative  mx-auto " onSubmit={handleSubmit(onSubmitLogin)} >
                                <h1 className='text-primary my-5 '>
                                    Admin Login
                                </h1>
                                <div className=''>
                                    <div className='flex space-y-6 flex-col  '>

                                        <div className="form-control flex flex-col">
                                            <TextField
                                                type="email"
                                                className={`w-[100%] md:w-[350px]`}
                                                placeholder="Email"
                                                {...register("email", {
                                                    required: {
                                                        value: true,
                                                        message: 'Email is Required'
                                                    }
                                                })}
                                                variant="outlined"
                                            />

                                            <label className="label">
                                                {errors?.email?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.email?.message}</span>}
                                            </label>
                                        </div>
                                        <div className="form-control flex flex-col">
                                            <TextField
                                                type="password"
                                                className={`w-[100%] md:w-[350px]`}
                                                placeholder="Password"
                                                {...register("password", {
                                                    required: {
                                                        value: true,
                                                        message: 'Password is Required'
                                                    }
                                                })}
                                                variant="outlined"
                                            />

                                            <label className="label">
                                                {errors?.password?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.password?.message}</span>}
                                            </label>
                                        </div>
                                    </div>
                                    <div className=' mt-5'>

                                        <Button
                                            // disabled={submit? true : false}
                                            className=' w-[100%]'
                                            type='submit'
                                            variant="contained"> <span className=''>Login</span></Button>
                                    </div>

                                </div>

                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1} className='flex justify-center'>
                        <div>
                            <form className=" flex  justify-center items-center flex-col relative  mx-auto" onSubmit={handleSubmit(onSubmitRegister)}>
                                <h1 className='text-primary my-5 '>
                                    Admin Registration
                                </h1>
                                <div className=''>
                                    <div className='flex space-y-6 flex-col  '>
                                        <div className="form-control flex flex-col">
                                            <TextField
                                                // value={name}
                                                type="text"
                                                className={`w-[100%] md:w-[350px]`}
                                                placeholder="Name"
                                                {...register("name", {
                                                    required: {
                                                        value: true,
                                                        message: 'Name is Required'
                                                    }
                                                })}
                                                variant="outlined"
                                            />

                                            <label className="label">
                                                {errors?.name?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.name.message}</span>}
                                            </label>
                                        </div>

                                        <div className="form-control flex flex-col">
                                            <TextField
                                                type="email"
                                                className={`w-[100%] md:w-[350px]`}
                                                placeholder="Email"
                                                {...register("email", {
                                                    required: {
                                                        value: true,
                                                        message: 'Email is Required'
                                                    }
                                                })}
                                                variant="outlined"
                                            />

                                            <label className="label">
                                                {errors?.email?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.email?.message}</span>}
                                            </label>
                                        </div>
                                        <div className="form-control flex flex-col">
                                            <TextField
                                                type="password"
                                                className={`w-[100%] md:w-[350px]`}
                                                placeholder="Password"
                                                {...register("password", {
                                                    required: {
                                                        value: true,
                                                        message: 'Password is Required'
                                                    }
                                                })}
                                                variant="outlined"
                                            />

                                            <label className="label">
                                                {errors?.password?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.password?.message}</span>}
                                            </label>
                                        </div>
                                    </div>
                                    <div className=' mt-5'>

                                        <Button
                                            // disabled={submit? true : false}
                                            className=' w-[100%]'
                                            type='submit'
                                            variant="contained"> <span className=''>Register</span></Button>
                                    </div>

                                </div>

                            </form>
                        </div>
                    </TabPanel>
                </Box>
            </Box>
        </div>
    )
}

export default AdminAuth

