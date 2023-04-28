import { createTheme, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import HomePage from './Components/HomePage/HomePage';
import Landing from './Components/HomePage/Landing';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/HomePage/Home';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import WhatsApp from './Components/WhatsApp/WhatsApp';
import About from './Components/About/About';
import Career from './Components/Career/Career';
import CSR from './Components/CSR/CSR';
import Stories from './Components/Stories/Stories';

// import Navbar from './Components/Navbar/Navbar';


const App = () => {


  const theme = createTheme({
    typography: {
      // fontFamily: 'Artifika',
      button: {
        textTransform: 'none'
      }
    },
    palette: {
      primary: {
        main: "#80a10a",//lgt2
        light: "#5b6d1a",
        dark: "#5b6d1a",
        mainGradient: "linear-gradient(to right , #480626, #7e2651)",
      },
    },
  });

const [isHome,setIsHome]=useState(false)




  return (


    <div>
      {
     
          <ThemeProvider theme={theme}>
            <Navbar isHome={isHome}></Navbar>
            <Routes >
              <Route path={`/`} element={<Home setIsHome={setIsHome}></Home>}></Route>
              <Route path={`/contact`} element={<Contact setIsHome={setIsHome}></Contact>}></Route>
              <Route path={`/about`} element={<About setIsHome={setIsHome}></About>}></Route>
              <Route path={`/csr`} element={<CSR setIsHome={setIsHome}></CSR>}></Route>
              <Route path={`/career`} element={<Career setIsHome={setIsHome}></Career>}></Route>
              <Route path={`/stories`} element={<Stories setIsHome={setIsHome}></Stories>}></Route>
            </Routes>
            <Footer></Footer>
            <WhatsApp></WhatsApp>
          </ThemeProvider>

      }
    </div>




  )
}

export default App