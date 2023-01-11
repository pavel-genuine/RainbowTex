import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AuthHome from './Components/Authentication/AuthHome';
import AuthMain from './Components/Authentication/AuthMain';
import SingleCarDetail from './Components/HomePage/CarResult/SingleCarDetail';
import CarFinder from './Components/HomePage/FindCars/CarFinder';
import FindCars from './Components/HomePage/FindCars/FindCars';
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

  let location = useLocation();
  const carOwner = 1
  const profile = 1

  const [notification,setNotification] = useState('Empty Notification'); 
  useEffect(() => {
    socket.on("ownerId1", (data) => {
      console.log("some data: ", data);
      setNotification(data); 
    });
  });

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
            <Route path={`/profile`} element={
            // <RequireAuth open={open} setOpen={setOpen}>
              <CarOwnerProfile></CarOwnerProfile>
              // </RequireAuth>
              }></Route>
          }
          {
            <Route path={`/carowner-profile`} element={<CarOwnerProfile></CarOwnerProfile>}></Route>
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
          {carOwner &&
            <Route path={`/carowner-info`} element={<CarOwnerInfoDoc></CarOwnerInfoDoc>}></Route>
          }
          {/* <Route path={`/find-cars`} element={<CarFinder></CarFinder>}></Route> */}

          <Route path={`/car-detail`} element={<SingleCarDetail open={open} setOpen={setOpen}></SingleCarDetail>}></Route>
          <Route path={`/auth`} element={<AuthHome></AuthHome>}></Route>

        </Routes>

        <BelowNav></BelowNav>
      </ThemeProvider>
    </QueryClientProvider>

  )
}

export default App