import { Box, Button, Dialog, Slide, styled, SwipeableDrawer } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import AuthHome from './AuthHome';
import CloseIcon from '@mui/icons-material/Close';
import { grey } from '@mui/material/colors';
import { useLocation, useNavigate } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AuthMain = ({open,setOpen}) => {
    const [openAuth, setOpenAuth] = useState()

    const StyledBox = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
    }));



    return (
        <div className='pt-20 '>
            <div className='h-[80vh] md:pt-5 md:max-w-[400px]  mx-auto px-5 md:border-4 md:h-[80vh] rounded-xl'>
                <div className='my-5'>
                    <h1 className='font-semibold'>My Profile</h1>
                    <h1 className='text-2xl mb-7 mt-4'>
                        Hello, Log in to your account.
                    </h1>
                </div>
                <Button onClick={() => setOpen(true)} sx={{ borderRadius: 28}} className='md:w-[350px] w-[100%]  h-[50px] ' variant="contained"> <span className='text-lg'>Log in</span> </Button>
            </div>
        </div>
    )
}

export default AuthMain