import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AuthMain from './Components/Authentication/AuthMain';
import HomePage from './Components/HomePage/HomePage';
import Navbar from './Components/Navbar/Navbar';


const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: 'Artifika',
      button: {
        textTransform: 'none'
      }
    },
    palette: {
      primary: {
        main: "#5c0931",
        light: "#6f3451",
        dark: "#5c0931",
        mainGradient: "linear-gradient(to right , #480626, #7e2651)",
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <Navbar></Navbar>
      <Routes>
        <Route path={`/`} element={<HomePage></HomePage>}></Route>
        <Route path={`/auth`} element={<AuthMain></AuthMain>}></Route>
      </Routes>
    </ThemeProvider>

  )
}

export default App