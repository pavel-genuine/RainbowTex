import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { logOut, passengerProfile } from '../../../api/api'
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
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { SwipeableDrawer } from '@mui/material';
import { useState } from 'react';

const PassengerProfile = () => {

  const [openSettings, setOpenSettings] = useState(false)
  const navigate =useNavigate()
  const fetcher = async () => {
    const { data } = await passengerProfile()
    return data
  }

  let { data:passenger, isLoading } = useQuery(["passengerprofile",], () => fetcher())

  const logoutHandler =async()=>{
    
    const {data}=await logOut()
    localStorage.clear()
    setTimeout(navigate('/auth'),500)
  }

  return (
    <Box className='md:pt-20 pt-16 mx-auto w-[100vw] md:w-[360px]' sx={{ bgcolor: 'background.paper' }}>
      <Box className='flex justify-between items-center px-6'>
        <p className=' text-primary text-bold py-2'>
          Name : {passenger?.name}
        </p>
        <AccountCircleOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }} ffontSize="medium"></AccountCircleOutlinedIcon>
      </Box>
      <Divider ></Divider>
      <List component="nav" aria-label="primary">
        <Link >
          <ListItemButton >
            <ListItemIcon>
              <CommuteIcon sx={{ scale: '1.3' }} />
            </ListItemIcon >
            <ListItemText primary="My Trips" />
          </ListItemButton>
        </Link>
        <ListItemButton>
          <ListItemIcon>
            <PaymentIcon sx={{ scale: '1.3' }} />
          </ListItemIcon >
          <ListItemText primary="My Wallet" />
        </ListItemButton>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary">
        <Link to={``}>
          <ListItemButton>
            <ListItemIcon>
              <FeedIcon sx={{ scale: '1.3' }} />
            </ListItemIcon >
            <ListItemText primary="Informations" />
          </ListItemButton>
        </Link>

        <ListItemButton onClick={() => setOpenSettings(true)}>
          <ListItemIcon>
            <SettingsApplicationsIcon sx={{ scale: '1.3' }} />
          </ListItemIcon >
          <ListItemText primary="Settings" />
        </ListItemButton>

        <Box className='md:mx-10 mx-2'>

          <SwipeableDrawer
            BackdropProps={{ style: { backgroundImage: 'linear-gradient(#5c0931, black)', opacity: .8 } }}
            transitionDuration={700}
            PaperProps={{ backgroundColor: 'black', square: false, sx: { borderRadius: '25px 25px 0 0', height: 300} }}
            open={openSettings}
            anchor="bottom"
            onClose={() => setOpenSettings(false)}
            onOpen={() => setOpenSettings(true)}
          >
            
            <Box className='py-5'>
              <List>
                <ListItemButton>
                  <ListItemIcon>
                    <LockIcon sx={{ scale: '1.3' }} />
                  </ListItemIcon >
                  <ListItemText primary="Privacy & Security" />
                </ListItemButton>

                <Divider></Divider>

                <ListItemButton onClick={logoutHandler}>
                  <ListItemIcon>
                    <LockIcon sx={{ scale: '1.3' }} />
                  </ListItemIcon >
                  <ListItemText primary="Log Out" />
                </ListItemButton>
              </List>
            </Box>
          </SwipeableDrawer>
        </Box>
      </List>
    </Box>
  );
}

export default PassengerProfile
