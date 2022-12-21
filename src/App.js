import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react'
import HomePage from './Components/HomePage/HomePage'

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#020267", 
        light: "#020267",
        dark: "#020267",
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