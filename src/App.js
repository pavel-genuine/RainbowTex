import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react'
import HomePage from './Components/HomePage/HomePage'

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#5c0931", 
        light: "#5c0931",
        dark: "#5c0931",
      },
    },
  });



  return (
    <ThemeProvider theme={theme}>
      <div>
        <HomePage></HomePage>
      </div>
    </ThemeProvider>

  )
}

export default App