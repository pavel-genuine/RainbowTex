import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AuthHome from './Components/Authentication/AuthHome';
import AuthMain from './Components/Authentication/AuthMain';
import SingleCarDetail from './Components/HomePage/CarResult/SingleCarDetail';
import HomePage from './Components/HomePage/HomePage';
import RequireAuth from './Components/hooks/requireAuth';
import BelowNav from './Components/Navbar/BelowNav';
import Navbar from './Components/Navbar/Navbar';
import CarOwnerVehicleDetail from './Components/Profile/CarOwner/CarOwnerCarDetail';
import CarOwnerDriverList from './Components/Profile/CarOwner/CarOwnerDriverList';
import CarOwnerInfoDoc from './Components/Profile/CarOwner/CarOwnerInfoDoc';
import CarOwnerProfile from './Components/Profile/CarOwner/CarOwnerProfile';
import CarOwnerProfileCompletion from './Components/Profile/CarOwner/CarOwnerProfileCompletion';
import CarOwnerVehicleList from './Components/Profile/CarOwner/CarOwnerVehicleList';
import io from "socket.io-client";
import { base_url } from './api/api';
import Profile from './Components/Profile/Profile';
import DriverProfileCompletion from './Components/Profile/DriverProfile/DriverProfileCompletion';
import AdminAuth from './Components/Authentication/AdminAuth';
import { getToken } from 'firebase/messaging';
import { messaging, onMessageListener } from './firebase.init';
import DriverInfoDoc from './Components/Profile/DriverProfile/DriverInfoDoc';


const socket = io.connect(base_url);
const queryClient = new QueryClient()

const App = () => {

  const [open, setOpen] = useState(false)

  const theme = createTheme({
    typography: {
      fontFamily: 'Artifika',
      button: {
        textTransform: 'none'
      }
    },
    palette: {
      primary: {
        // main: "#5c0931",//qtr
        // main: "#8d0434",//lgt
        main: "#8e2158",//lgt2
        light: "#8e2158",
        dark: "#8e2158",
        mainGradient: "linear-gradient(to right , #480626, #7e2651)",
      },
    },
  });

  const [pushNotification, setPushNotification] = useState({ title: '', body: '' });
  const [notification, setNotification] = useState('Empty Notification');


  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BBcbCAWfEk24LjPE3kqpFkRdRq257QfHpzFXPmMXV0QaWpDppATQCpeqKLjomdO_HbpYjLgNdQEl_sfatkkz0sc",
      });
      console.log("Token: ", token);
      // Send this token  to server ( db)
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }


  useEffect(() => {

    requestPermission()

    socket.on("ownerId1", (data) => {
      console.log("some data: ", data);
      setNotification(data);
    });

  });


  onMessageListener()
    .then((payload) => {
      setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
    })
    .catch((err) => console.log('failed: ', err));

  let location = useLocation();
  const carOwner = 1
  const profile = 1


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Navbar open={open} setOpen={setOpen} ></Navbar>
        <Routes >
          <Route path={`/`} element={<HomePage  open={open} setOpen={setOpen}></HomePage>}></Route>
          {carOwner &&
            <Route path={`/carowner-profile-completion`} element={<CarOwnerProfileCompletion></CarOwnerProfileCompletion>}></Route>
          }


          {carOwner &&
            <Route path={`/carowner-vehicle-list`} element={<CarOwnerVehicleList></CarOwnerVehicleList>}></Route>
          }
          {carOwner &&
            <Route path={`/carowner-vehicle/:id`} element={<CarOwnerVehicleDetail></CarOwnerVehicleDetail>}></Route>
          }
          {carOwner &&
            <Route path={`/carowner-driver-list`} element={<CarOwnerDriverList></CarOwnerDriverList>}></Route>
          }

          <Route path={`/carowner-info`} element={<CarOwnerInfoDoc></CarOwnerInfoDoc>}></Route>
          <Route path={`/driver-info`} element={<DriverInfoDoc></DriverInfoDoc>}></Route>


          <Route path={`/car-detail`} element={<SingleCarDetail ></SingleCarDetail>}></Route>
          <Route path={`/auth`} element={<AuthHome></AuthHome>}></Route>
          <Route path={`/profile`} element={<Profile></Profile>}></Route>
          <Route path={`/driver-profile-completion`} element={<DriverProfileCompletion></DriverProfileCompletion>}></Route>
          <Route path={`/admin-auth`} element={<AdminAuth></AdminAuth>}></Route>

        </Routes>

        <BelowNav></BelowNav>
      </ThemeProvider>
    </QueryClientProvider>

  )
}

export default App