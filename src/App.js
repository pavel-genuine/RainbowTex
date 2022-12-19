import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react'
import HomePage from './Components/HomePage/HomePage'

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#10a310", 
        light: "#10a310",
        dark: "#10a310",
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