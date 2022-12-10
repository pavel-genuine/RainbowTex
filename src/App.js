import { Route, Routes } from "react-router-dom";

import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import Navbar from "./Components/Navbar/Navbar"
import HomePage from "./Components/HomePage/HomePage";
import ContactUs from "./Components/ContactUs/ContactUs";
import AboutUs from "./Components/AboutUs/AboutUs";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import Profile from "./Components/Profile/Profile";
import PublishPost from "./Components/Dashboard/PublishPost/PublishPost";
import DashboardHome from "./Components/Dashboard/DashBoardHome/DashboardHome";
import UserList from "./Components/Dashboard/UserList/UserList";
import MovieList from "./Components/Dashboard/MovieList/MovieList";
import MovieDetails from "./Components/MovieDetail/MovieDetail";
import { useState } from "react";
import PostSearch from './Components/Categories/PostFilter/PostSearch'
import EditPost from "./Components/Dashboard/MovieList/EditPost";
import PaymentHome from "./Components/Payment/PaymentHome";
import GSignin from "./Components/SignIn/GSignin";
import RequireAdmin from "./Components/Shared/hooks/requireAdmin";
import RequireAuth from "./Components/Shared/hooks/requireAuth";

const queryClient = new QueryClient()
function App() {

  const [filteredCategory, setfilteredCategory] = useState()
  const [searchText, setSearchText] = useState('')

  const filterHandler = (data) => {

    setfilteredCategory(() => data)
  }

  const searchHandler = (data) => {
    setSearchText(() => data)

  }


  return (
    <QueryClientProvider client={queryClient}>
      <div className="text-[80%] md:text-[90%] lg:text-[100%]">
        <Navbar filterHandler={filterHandler} searchHandler={searchHandler}></Navbar>
        <Routes>
          <Route path='/' element={<HomePage filteredCategory={filteredCategory}></HomePage>}></Route>
          <Route path='/post-search' element={<PostSearch searchText={searchText} filteredCategoryId={filteredCategory?._id}></PostSearch>}></Route>
          <Route path='/contact-us' element={<ContactUs></ContactUs>}></Route>
          <Route path='/about-us' element={<AboutUs></AboutUs>}></Route>
          <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
          <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
          <Route path='/dashboard' element={<RequireAdmin><DashboardHome></DashboardHome></RequireAdmin>}></Route>
          <Route path='/dashboard/movie-list' element={<RequireAdmin><MovieList></MovieList></RequireAdmin>}></Route>
          <Route path='/dashboard/userlist' element={<RequireAdmin><UserList></UserList></RequireAdmin>}></Route>
          <Route path='/dashboard/publish-post' element={<RequireAdmin><PublishPost></PublishPost></RequireAdmin>}></Route>
          <Route path='/dashboard/edit-post/:id' element={<RequireAdmin><EditPost></EditPost></RequireAdmin>}></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
          <Route path='/movie-detail/:id' element={<RequireAuth><MovieDetails></MovieDetails></RequireAuth>}></Route>
          <Route path='/payment' element={<PaymentHome></PaymentHome>}></Route>
          <Route path={`/google?logintoken=${localStorage.getItem('loginToken')}`} element={<GSignin></GSignin>}></Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
