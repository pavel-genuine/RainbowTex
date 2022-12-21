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
import { AppBar, createTheme, CssBaseline, Drawer, IconButton, ThemeProvider, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AuthHome from '../Authentication/AuthHome';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';


export default function Navbar() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [background, setBackground] = React.useState()
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const theme = createTheme({
        palette: {
            primary: {
                main: "#000000",
            },
        },
        zIndex: {
            drawer: 20
        }
    });
    const [open1, setOpen1] = React.useState(false);
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

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
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

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {
                    !open ? <ListItemButton onClick={handleDrawerOpen}
                    sx={{ ...(open && { display: 'none' }) }}>
                        <ListItemIcon>
                            <PersonIcon color='primary'></PersonIcon>
                        </ListItemIcon>
                        <span  className='text-primary'>Login or Singup</span>
                    </ListItemButton>
                        :
                        <ListItemButton onClick={handleDrawerClose}
                        sx={{ ...(!open && { display: 'none' }) }}>
                            <ListItemIcon>
                                <PersonIcon color='primary'></PersonIcon>
                            </ListItemIcon>
                            <span  className='text-primary'>Login or Singup</span>
                        </ListItemButton>
                }

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
        <div style={{ zIndex: '20' }} className={`md:h-[70px] h-[60px] w-[100%]  fixed text-white bg-black ${background ? 'bg-opacity-90' : 'bg-opacity-90'} backdrop-filter-none backdrop-blur-sm shadow `}>
            <ThemeProvider theme={theme}>
                <AppBar>
                    <div className='flex items-center justify-between   md:h-[70px] h-[60px]  md:w-[100%] md:mx-auto'>

                        <div className='flex items-center'>
                            {['left'].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <Button onClick={toggleDrawer(anchor, true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                    </Button>
                                    <SwipeableDrawer
                                        anchor={anchor}
                                        open={state[anchor]}
                                        onClose={toggleDrawer(anchor, false)}
                                        onOpen={toggleDrawer(anchor, true)}
                                    >
                                        {list(anchor)}
                                    </SwipeableDrawer>
                                </React.Fragment>
                            ))}
                            <Link to={`/`}>
                                <button onClick={handleDrawerClose} sx={{ ...(!open && { display: 'none' }) }} className='text-white text-xl font-semibold'>GoRental</button>
                            </Link>
                        </div>
                        <div className='md:mx-10 mx-2'>
                            <IconButton
                                aria-label="open drawer"

                                onClick={handleDrawerOpen}
                                sx={{ ...(open && { display: 'none' }) }}
                            >
                                <span className='text-white text-xl'>Sign in</span>
                            </IconButton>
                            <IconButton
                                aria-label="open drawer"

                                onClick={handleDrawerClose}
                                sx={{ ...(!open && { display: 'none' }) }}
                            >
                                <span className='text-white text-xl'>Sign in</span>
                            </IconButton>

                            {/* <button className='px-3 py-2 bg-white rounded-full text-black mr-5 flex items-center '> <CarRentalIcon color='primary' /> <span className='ml-1'>Be A Partner</span></button>
                    <button className='hidden md:block   md:mx-20'>Login/Sign in </button> */}
                        </div>

                    </div>
                </AppBar>


                <div className='bg-black'>
                    <Box>
                        <Drawer
                            sx={{
                                width: drawerWidth,
                                flexShrink: 0,
                                '& .MuiDrawer-paper': {
                                    width: drawerWidth,
                                },
                            }}
                            variant="persistent"
                            anchor="top"
                            open={open}
                        >
                            <List
                                sx={{
                                    height: window.outerHeight,
                                    flexShrink: 0,
                                    '& .MuiDrawer-paper': {
                                        width: drawerWidth,
                                    },
                                }}>
                                <div>

                                    <AuthHome></AuthHome>
                                </div>
                            </List>
                        </Drawer>

                    </Box>

                </div>
            </ThemeProvider>
        </div>
    );
}