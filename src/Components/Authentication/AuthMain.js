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

const AuthMain = () => {
    const [openAuth, setOpenAuth] = useState()

    const StyledBox = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
    }));

    // const location = useLocation();
    // let from = location.state?.from?.pathname || "/";
    // const navigate = useNavigate();

    // navigate(from, { replace: true });

    return (
        <div className='pt-20 min-h-[100vh] md:max-w-[300px] mx-auto px-5 '>
            <div className=''>
                <h1 className='font-semibold mb-2'>My Profile</h1>
                <h1 className='text-2xl'>
                    Hello, Sign in to your account.
                </h1>
            </div>
            <Button onClick={() => setOpenAuth(true)} sx={{ borderRadius: 28, margin: 4 }} className='md:w-[300px] w-[80%] mx-20' variant="contained"> <span className='text-lg'>Log in</span> </Button>

            <SwipeableDrawer BackdropProps={{ style: { backgroundImage: 'linear-gradient(to top left, #5c0931, #690033)', opacity: .8 } }}
                transitionDuration={700}
                PaperProps={{ backgroundColor: 'black', square: false, sx: { height: window?.innerHeight - 60, borderRadius: { xs: '25px 25px 0 0', md: '0' } } }}
                anchor="bottom"
                open={openAuth}
                onClose={()=>setOpenAuth(false)}
                onOpen={()=>setOpenAuth(true)}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                >
                </StyledBox>

                <StyledBox sx={{ height: '100%', overflow: 'auto', }}>
                    <span onClick={()=>setOpenAuth(false)} className='fixed right-0 top-[1%] z-[100%] p-3'>
                        <CloseIcon className='text-white' />
                    </span>
                    <AuthHome></AuthHome>
                </StyledBox>

            </SwipeableDrawer>

            {/* <div style={{ backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)' }} className=' w-[200px] h-[100px] rounded-md '>
                <p>Join</p>
                <p>Privilege Club</p>
            </div> */}
        </div>
    )
}

export default AuthMain