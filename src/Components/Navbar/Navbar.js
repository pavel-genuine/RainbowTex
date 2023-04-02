import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CarRentalIcon from '@mui/icons-material/CarRental';
import { AppBar, ClickAwayListener, createTheme, CssBaseline, Drawer, GlobalStyles, IconButton, styled, Tab, Tabs, ThemeProvider, Typography, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AuthHome from '../Authentication/AuthHome';
import { Link, useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { grey } from '@mui/material/colors';


const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

export default function Navbar({ open, setOpen }) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });


    const navigate = useNavigate()
    React.useEffect(() => {
        function handlePopState(event) {
            setOpen(false)
            navigate(0)
        }

        window.addEventListener('popstate', handlePopState);
        // window.addEventListener('popstate',  setOpenSearch(false));
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);


    const toggleDrawerSide = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const toggleDrawer = (open) => (event) => {
        setOpen(() => open);

    };

    React.useEffect(() => {
        function handlePopState(event) {
            setOpen(false);
            setState(false)
        }

        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);



    const list = (anchor) => (
        <Box

            sx={{ height: window?.innerHeight - 60 }}
            role="presentation"
            onClick={toggleDrawerSide(anchor, false)}
            onKeyDown={toggleDrawerSide(anchor, false)}
        >
            <List>
                <Box className='flex justify-center '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-28 h-16 text-[grey]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>

                </Box>
                <Link to={`/`}>
                    <ListItemButton >
                        <ListItemIcon>
                            <HouseOutlinedIcon ></HouseOutlinedIcon>
                        </ListItemIcon>
                        <span className=''>Home</span>
                    </ListItemButton>
                </Link>

                {/* <Link className='text-primary' to={`/profile`}> */}
                {localStorage.getItem('role') ?
                    <Link to={`/profile`}>
                        <ListItemButton >
                            <ListItemIcon>
                                <AccountCircleOutlinedIcon color='primary'></AccountCircleOutlinedIcon>
                            </ListItemIcon>
                            <ListItemText className='text-primary' primary={'Profile'} />
                        </ListItemButton>
                    </Link>
                    :
                    <ListItemButton onClick={toggleDrawer(true)} >
                        <ListItemIcon>
                            <AccountCircleOutlinedIcon color='primary'></AccountCircleOutlinedIcon>
                        </ListItemIcon>
                        <ListItemText className='text-primary' primary={'Log In'} />
                    </ListItemButton>
                }
                {/* </Link> */}

                <ListItemButton>
                    <ListItemIcon>
                        <PhoneIcon></PhoneIcon>
                    </ListItemIcon>
                    <ListItemText primary={'Help & Support'} />
                </ListItemButton>
            </List>
        </Box>
    );

    return (

        <Box className='z-40 w-[100%] fixed bg-white  md:bg-primary md:bg-gradient-to-r md:from-[#480626] md:to-[#7c2a52] backdrop-filter-none backdrop-blur-sm shadow md:h-[70px] h-[60px]    md:w-[100%]'>
            <Box className={`flex items-center justify-between md:h-[80px] h-[60px] w-[90%] mx-auto `}>
                <CssBaseline />
                <div className='flex items-center'>
                    {['bottom'].map((anchor) => (
                        <React.Fragment key={anchor}>
                            {/* <Link to={ `/side-nav`}> */}
                            <IconButton
                                onClick={toggleDrawerSide(anchor, true)} onClose={toggleDrawerSide(anchor, false)}
                                edge="start"
                                sx={{ mx: { md: 2 } }}
                                color="inherit"
                                aria-label="menu"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="md:h-7 md:w-7 h-5 w-5 md:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>

                            </IconButton>
                            {/* </Link> */}
                            <SwipeableDrawer
                                BackdropProps={{ style: { backgroundImage: 'linear-gradient(#5c0931, black)', opacity: .9 } }}
                                transitionDuration={700}
                                PaperProps={{ backgroundColor: 'black', square: false, sx: { borderRadius: '25px 25px 0 0' } }}
                                anchor={anchor}
                                // open={open}
                                open={state[anchor]}
                                onClose={toggleDrawerSide(anchor, false)}
                                onOpen={toggleDrawerSide(anchor, true)}
                            >
                                <span onClick={toggleDrawerSide(anchor, false)} className='fixed right-0 top-[1%] z-[100%] p-3'>
                                    <CloseIcon className='text-white' />
                                </span>

                                {list(anchor)}

                            </SwipeableDrawer>
                            {/* </ClickAwayListener> */}
                        </React.Fragment>
                    ))}
                    <Link to={`/`}>

                        <Button >
                            <p className='relative mb-[10px] md:mb-[20px]'>
                                <span className='text-primary md:text-white text-2xl md:text-3xl  '>
                                Goti</span> <br />

                                <span className='font-Allura text-[white] absolute top-[20px] md:top-[25px] left-[0px] text-xl  md:text-2xl'>
                                    Rentals
                                </span>
                            </p>
                        </Button>

                    </Link>
                </div>
                <div className='md:mx-10 mx-2'>

                    {
                        localStorage.getItem('userId') ?
                            " "
                            :
                            <Button onClick={toggleDrawer(true)}
                                aria-label="open drawer"
                            >
                                <span className='md:text-white text-black md:text-xl text-[15px]'>Log in</span>
                            </Button>
                    }

                    <SwipeableDrawer
                        BackdropProps={{ style: { backgroundImage: 'linear-gradient(#5c0931, black)', opacity: .9 } }}
                        transitionDuration={700}
                        PaperProps={{ backgroundColor: 'black', square: false, sx: { borderRadius: '25px 25px 0 0', height: window?.innerHeight - 60 } }}
                        open={open}
                        anchor="bottom"
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                    >
                        <StyledBox sx={{ height: '100%', overflow: 'hidden' }}>
                            <span onClick={toggleDrawer(false)} style={{ color: 'white' }} className='fixed right-0 top-[1%] z-[100%] p-3 cursor-pinter'>
                                <CloseIcon className='text-white' />
                            </span>
                            <AuthHome setOpen={setOpen}></AuthHome>
                        </StyledBox>
                    </SwipeableDrawer>
                </div>
            </Box>
        </Box>

    );
}