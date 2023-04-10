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
import AdminCarCategories from './Components/Profile/Admin/AdminCarCategories';
import {BOOKING_CANCELLED,BOOKING_FAILURE,BOOKING_REQUEST,BOOKING_SUCCESS, RIDE_ENDS, RIDE_STARTS} from './constants/constants'

const socket = io.connect('https://api.gotirentals.com');
const queryClient = new QueryClient()

const App = () => {

  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');

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

  const [newNotification, setNewNotification] = useState();
  const [notification, setNotification] = useState('Empty Notification');
  const [notificationData, setNotificationData] = useState({});


  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BBcbCAWfEk24LjPE3kqpFkRdRq257QfHpzFXPmMXV0QaWpDppATQCpeqKLjomdO_HbpYjLgNdQEl_sfatkkz0sc",
      });
      console.log("FCM Token: ", token);
      localStorage.setItem('fcmToken',token)
      // Send this token  to server ( db)
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  const getLocalStorage = async () => {
    
    const userid = localStorage.getItem('userId')
    const usertype = localStorage.getItem('role')
    setUserId(userid)
    setUserType(usertype)

    console.log(usertype, 'utype', userid, 'userid')

    socket.auth = {
      userInfo: { userId: userid, userType: usertype },
    }

    console.log(socket, 'socket')

  }


  useEffect(() => {

    requestPermission()
    getLocalStorage()

    socket.on(BOOKING_REQUEST, async (msg) => {
      setNewNotification(true)
      console.log(JSON.parse(msg), 'msg req json')

      setNotificationData(JSON.parse(msg))
    })

    socket.on(BOOKING_CANCELLED, (msg) => {
      setNewNotification(true)
      console.log(JSON.parse(msg), 'msg cancel json')

    })

    socket.on(BOOKING_FAILURE, (msg) => {
      setNewNotification(true)
      console.log(JSON.parse(msg), 'msg failur json')


    })

    socket.on(BOOKING_SUCCESS, async (msg) => {
      setNewNotification(true)
      console.log(JSON.parse(msg), 'msg success json')

      setNotificationData(JSON.parse(msg))

    })

    socket.on(RIDE_STARTS, async (msg) => {
      setNewNotification(true)
      console.log(JSON.parse(msg), 'msg ride starts json')


      setNotificationData(JSON.parse(msg))
    })
    socket.on(RIDE_ENDS, async (msg) => {
      setNewNotification(true)
      console.log(JSON.parse(msg), 'msg ride ends json')


      setNotificationData(JSON.parse(msg))
    })

  },[userId,userType]);




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
          <Route path={`/`} element={<HomePage open={open} setOpen={setOpen}></HomePage>}></Route>
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
          <Route path={`/profile`} element={<Profile open={open} setOpen={setOpen}></Profile>}></Route>
          <Route path={`/driver-profile-completion`} element={<DriverProfileCompletion></DriverProfileCompletion>}></Route>
          <Route path={`/admin-auth`} element={<AdminAuth></AdminAuth>}></Route>
          <Route path={`/admin-add-car`} element={<AdminCarCategories></AdminCarCategories>}></Route>

        </Routes>

        <BelowNav ></BelowNav>
      </ThemeProvider>
    </QueryClientProvider>

  )
}

export default App