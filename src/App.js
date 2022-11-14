import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import Navbar from "./Components/Navbar/Navbar"
import HomePage from "./Components/HomePage/HomePage";
import ContactUs from "./Components/ContactUs/ContactUs";
import AboutUs from "./Components/AboutUs/AboutUs";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <Navbar></Navbar>
       <Routes>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/contact-us' element={<ContactUs></ContactUs>}></Route>
          <Route path='/about-us' element={<AboutUs></AboutUs>}></Route>
          <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
          <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
     </Routes>
    </div>
    </QueryClientProvider>
  );
}

export default App;
