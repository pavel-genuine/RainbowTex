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
        // main: "#5c0931",//qtr
        // main: "#8d0434",//lgt
        main: "#80a10a",//lgt2
        light: "#5b6d1a",
        dark: "#5b6d1a",
        mainGradient: "linear-gradient(to right , #480626, #7e2651)",
      },
    },
  });

  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    setIsOpen(true)

    setTimeout(() => {
      setLoading(false)
    }, 2000)
    setTimeout(() => {
      setIsOpen(false)
    }, 2500)

  }, [])




  return (


    <div>
      {
        isOpen ?
          <div
            style={{
              opacity: !loading ? "0" : "1",
              transition: "all .7s",
              visibility: !loading ? "hidden" : "visible",
            }}
            className=' bg-[white] h-[100vh] flex justify-center items-center mx-auto'>
            <Landing></Landing>
          </div>
          :
          <ThemeProvider theme={theme}>
            <Navbar></Navbar>
            <Routes >
              <Route path={`/`} element={!isOpen &&<Home></Home>}></Route>
              <Route path={`/contact`} element={<Contact></Contact>}></Route>
              <Route path={`/about`} element={<About></About>}></Route>
              <Route path={`/csr`} element={<CSR></CSR>}></Route>
              <Route path={`/career`} element={<Career></Career>}></Route>
              <Route path={`/stories`} element={<Stories></Stories>}></Route>
            </Routes>
            <Footer></Footer>
            <WhatsApp></WhatsApp>
          </ThemeProvider>

      }
    </div>




  )
}

export default App