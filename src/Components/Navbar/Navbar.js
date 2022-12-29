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
import { width } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Navbar({ open, setOpen }) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [background, setBackground] = React.useState()
    const anchorRef = React.useRef(null);
    const [tabValue, setTabValue] = React.useState(0);

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
                <Link onClick={()=>setTabValue(0)} to={`/`}>
                    <ListItemButton >
                        <ListItemIcon>
                        <HouseOutlinedIcon ></HouseOutlinedIcon>
                        </ListItemIcon>
                        <span className=''>Home</span>
                    </ListItemButton>
                </Link>

                <Link className='active:bg-white' onClick={()=>setTabValue(3)} to={`/auth`}>
                    <ListItemButton >
                        <ListItemIcon>
                        <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Login or Signup'} />
                    </ListItemButton>
                </Link>

                <ListItemButton>
                    <ListItemIcon>
                        <PhoneIcon></PhoneIcon>
                    </ListItemIcon>
                    <ListItemText primary={'Help & Support'} />
                </ListItemButton>
            </List>
        </Box>
    );

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);

        console.log(newValue,'vvv');
    };

    return (

        <Box className='z-20 w-[100%] fixed bg-white  md:bg-primary md:bg-gradient-to-r md:from-[#480626] md:to-[#7c2a52] backdrop-filter-none backdrop-blur-sm shadow md:h-[70px] h-[60px]    md:w-[100%]'>
            <div className='md:hidden'>
                <Tabs sx={{ boxShadow: 3, backgroundColor: '#f7f7f7' }} className='px-1 flex bottom-0 md:hidden z-20 mx-auto fixed space-x-14 w-[100vw] border border-t-[grey]' value={tabValue} onChange={handleChangeTab} aria-label="basic tabs example" >
                    <Tab to="/" component={Link} style={{ fontSize: '11px' }} className='normal-case' icon={<HouseOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }} fontSize="medium"></HouseOutlinedIcon>} disableRipple label="Home" {...a11yProps(0)} />
                    <Tab to="/find-cars" component={Link} style={{ fontSize: '11px' }} className='normal-case' icon={<SearchOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }} fontSize="medium"></SearchOutlinedIcon>} disableRipple label="Find" {...a11yProps(1)} />
                    <Tab style={{ fontSize: '11px' }} className='normal-case' icon={<TimeToLeaveOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }} fontSize="medium"></TimeToLeaveOutlinedIcon>} disableRipple label="Trip" {...a11yProps(2)} />
                    <Tab to="/auth" component={Link} style={{ fontSize: '11px' }} className='normal-case' icon={<AccountCircleOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }} fontSize="medium"></AccountCircleOutlinedIcon>} disableRipple label="Profile" {...a11yProps(3)} />
                </Tabs>
            </div>
            <Box
                className={`flex items-center justify-between md:h-[70px] h-[60px] w-[90%] mx-auto `}>

                <div className='flex items-center'>
                    {['bottom'].map((anchor) => (
                        <React.Fragment key={anchor}>
                            <IconButton
                                onClick={toggleDrawerSide(anchor, true)} onClose={toggleDrawer(anchor, false)}
                                edge="start"
                                sx={{ mx: {md:2} }}
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
                    <Link onClick={()=>setTabValue(0)}  to={`/`}>

                        <Button ><span className='md:text-white text-primary md:text-xl text-lg'>GoRental</span></Button>

                    </Link>
                </div>
                <div className='md:mx-10 mx-2'>
                    {
                        <Link onClick={()=>setTabValue(3)} to={`/auth`}>
                            <Button
                                aria-label="open drawer"
                            >
                                <span className='md:text-white text-primary md:text-xl text-lg'>Sign in</span>
                            </Button></Link>
                    }
                </div>

            </Box>
        </Box>

    );
}