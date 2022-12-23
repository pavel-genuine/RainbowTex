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
import { AppBar, createTheme, CssBaseline, Drawer, GlobalStyles, IconButton, styled, ThemeProvider, Typography, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AuthHome from '../Authentication/AuthHome';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import useDrawerOpen from '../../hooks/useDrawerOpen';
import { grey } from '@mui/material/colors';


export default function Navbar({ open, setOpen }) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [background, setBackground] = React.useState()
    // const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    // const { handleOpenDrawer, open, setOpen } = useDrawerOpen()

    const theme = createTheme({
        palette: {
            primary: {
                main: "#5c0931",
            },
        },
        zIndex: {
            drawer: 20
        }

    });

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
    const toggleDrawer = (anchor, open) => (event) => {
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

                {
                    !open ? <ListItemButton onClick={handleDrawerOpen}
                        sx={{ ...(open && { display: 'none' }) }}>
                        <ListItemIcon>
                            <PersonIcon color='primary'></PersonIcon>
                        </ListItemIcon>
                        <span className='text-primary'>Login or Singup</span>
                    </ListItemButton>
                        :
                        <ListItemButton onClick={handleDrawerClose}
                            sx={{ ...(!open && { display: 'none' }) }}>
                            <ListItemIcon>
                                <PersonIcon color='primary'></PersonIcon>
                            </ListItemIcon>
                            <span className='text-primary'>Login or Singup</span>
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
                    <div className='flex items-center justify-between   md:h-[70px] h-[60px]  md:w-[100%]'>

                        <div className='flex items-center'>
                            {['bottom'].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <Button onClick={toggleDrawerSide(anchor, true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                    </Button>
                                    <SwipeableDrawer
                                        transitionDuration={700}
                                        PaperProps={{ backgroundColor: 'black', square: false, sx: { borderRadius: '25px 25px 0 0' } }}
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

                                onClick={() => setOpen(true)}
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

                {/* <Box>
                    <Drawer
                        transitionDuration={700}
                        hideBackdrop={false}
                        PaperProps={{ square: false, sx: { borderRadius: '25px 25px 0 0' } }}

                        sx={{
                            '& .MuiDrawer-paper': {
                            },

                        }}
                        variant="persistent"
                        anchor="bottom"
                        open={open}
                    >
                        <List
                            sx={{
                                '& .MuiDrawer-paper': {
                                },
                                height: window?.innerHeight - 100,

                            }}>
                            <AuthHome></AuthHome>
                        </List>
                    </Drawer>
                </Box> */}

             
                    <SwipeableDrawer

                   transitionDuration={700}
                   PaperProps={{ backgroundColor: 'black', square: false, sx: { height: window?.innerHeight - 60 , borderRadius: '25px 25px 0 0' } }}
                        anchor="bottom"
                        open={open}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
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
                        <StyledBox
                            sx={{
                                height: '100%',
                                overflow: 'auto',
                            }}
                        >
                            <AuthHome></AuthHome>
                        </StyledBox>
                    </SwipeableDrawer>
               
            </ThemeProvider>
        </div>

    );
}