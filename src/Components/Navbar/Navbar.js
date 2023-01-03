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
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import useDrawerOpen from '../hooks/useDrawerOpen';
import { grey } from '@mui/material/colors';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TimeToLeaveOutlinedIcon from '@mui/icons-material/TimeToLeaveOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import { useState } from 'react';


export default function Navbar({ open, setOpen }) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [background, setBackground] = React.useState()
    const anchorRef = React.useRef(null);
    // const [open, setOpen] = useState()
    const drawerWidth = window.outerWidth;

    const handleDrawerOpen = () => {
        setOpen(true);
    };


    const handleDrawerClose = () => {
        setOpen(false);
    };


    const changeBackground = () => {

        if (window.scrollY >= 70) {
            setBackground(true)

        } else {
            setBackground(false)

        }
    }

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
        setOpen(open);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const Root = styled('div')(({ theme }) => ({
        height: '100%',
        backgroundColor:
            theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
    }));
    const StyledBox = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
    }));

    const Puller = styled(Box)(({ theme }) => ({
        width: 30,
        height: 6,
        backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
        borderRadius: 3,
        position: 'absolute',
        top: 8,
        left: 'calc(50% - 15px)',
    }));


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
                    <ListItemButton onClick={toggleDrawer(true)} >
                        <ListItemIcon>
                            <AccountCircleOutlinedIcon color='primary'></AccountCircleOutlinedIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Log in'} />
                    </ListItemButton>
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

        <Box className='z-20 w-[100%] fixed bg-white  md:bg-primary md:bg-gradient-to-r md:from-[#480626] md:to-[#7c2a52] backdrop-filter-none backdrop-blur-sm shadow md:h-[70px] h-[60px]    md:w-[100%]'>
            <Box
                className={`flex items-center justify-between md:h-[70px] h-[60px] w-[90%] mx-auto `}>

                <div className='flex items-center'>
                    {['bottom'].map((anchor) => (
                        <React.Fragment key={anchor}>
                            <IconButton
                                onClick={toggleDrawerSide(anchor, true)} onClose={toggleDrawer(anchor, false)}
                                edge="start"
                                sx={{ mx: { md: 2 } }}
                                color="inherit"
                                aria-label="menu"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>

                            </IconButton>
                            <SwipeableDrawer
                                BackdropProps={{ style: { backgroundImage: 'linear-gradient(#5c0931, black)', opacity: .8 } }}
                                transitionDuration={700}
                                PaperProps={{ backgroundColor: 'black', square: false, sx: { borderRadius: '25px 25px 0 0' } }}
                                anchor={anchor}
                                // open={open}
                                open={state[anchor]}
                                onClose={toggleDrawerSide(anchor, false)}
                                onOpen={toggleDrawerSide(anchor, true)}
                            >
                                <button onClick={toggleDrawerSide(anchor, false)} className='fixed right-0 top-[1%] z-[100%] p-3'>
                                    <CloseIcon className='text-white' />
                                </button>

                                {list(anchor)}

                            </SwipeableDrawer>
                            {/* </ClickAwayListener> */}
                        </React.Fragment>
                    ))}
                    <Link to={`/`}>

                        <Button ><span className='md:text-white text-primary md:text-xl text-lg'>GoRental</span></Button>

                    </Link>
                </div>
                <div className='md:mx-10 mx-2'>

                    {/* <Link  to={`/profile`}> */}
                    <Button onClick={toggleDrawer(true)}
                        aria-label="open drawer"
                    >
                        <span className='md:text-white text-primary md:text-xl text-lg'>Log in</span>
                    </Button>
                    {/* </Link> */}

                    <SwipeableDrawer
                        BackdropProps={{ style: { backgroundImage: 'linear-gradient(#5c0931, black)', opacity: .8 } }}
                        transitionDuration={700}
                        PaperProps={{ backgroundColor: 'black', square: false, sx: { borderRadius: '25px 25px 0 0' } }}
                        open={open}
                        anchor="bottom"
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                    >
                        <button onClick={toggleDrawerSide(false)} className='fixed right-0 top-[1%] z-[100%] p-3'>
                            <CloseIcon className='text-white' />
                        </button>

                        <AuthHome></AuthHome>

                    </SwipeableDrawer>

                </div>

            </Box>
        </Box>

    );
}