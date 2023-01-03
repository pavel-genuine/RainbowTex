import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CommuteIcon from '@mui/icons-material/Commute';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import PaymentIcon from '@mui/icons-material/Payment';
import FeedIcon from '@mui/icons-material/Feed';
import LockIcon from '@mui/icons-material/Lock';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { Link } from 'react-router-dom';

export default function CarOwnerProfile() {


    return (
        <Box className='md:pt-20 pt-16 mx-auto w-[100vw] md:w-[360px]' sx={{ bgcolor: 'background.paper' }}>
            <p className=' text-center text-primary text-bold py-2'> Profile</p>
            <Divider ></Divider>
            <List component="nav" aria-label="primary">
                <Link to={`/carowner-vehicle-list`}>
                    <ListItemButton >
                        <ListItemIcon>
                            <CommuteIcon sx={{ scale: '1.3' }} />
                        </ListItemIcon >
                        <ListItemText primary="My Vehicles" />
                    </ListItemButton>
                </Link>
                <Link to={`/carowner-driver-list`}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AirlineSeatReclineNormalIcon sx={{ scale: '1.3' }} />
                        </ListItemIcon>
                        <ListItemText primary="My Drivers" />
                    </ListItemButton>
                </Link>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary">
                <Link to={`/carowner-info`}>
                    <ListItemButton>
                        <ListItemIcon>
                            <FeedIcon sx={{ scale: '1.3' }} />
                        </ListItemIcon >
                        <ListItemText primary="Informations & Docummmens" />
                    </ListItemButton>
                </Link>
                <ListItemButton>
                    <ListItemIcon>
                        <PaymentIcon sx={{ scale: '1.3' }} />
                    </ListItemIcon >
                    <ListItemText primary="Payments" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <LockIcon sx={{ scale: '1.3' }} />
                    </ListItemIcon >

                    <ListItemText primary="Privacy & Security" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <SettingsApplicationsIcon sx={{ scale: '1.3' }} />
                    </ListItemIcon >
                    <ListItemText primary="Settings" />
                </ListItemButton>
            </List>
        </Box>
    );
}