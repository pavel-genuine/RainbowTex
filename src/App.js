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

const queryClient = new QueryClient()
function App() {

  const [filteredCategory, setfilteredCategory] = useState()
  const [searchText, setSearchText] = useState('')

  const filterHandler = (data) => {

    setfilteredCategory(() => data)
  }

  console.log('filter',filteredCategory);
  const searchHandler = (data) => {
    setSearchText(() => data)

  }


  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Navbar filterHandler={filterHandler} searchHandler={searchHandler}></Navbar>
        <Routes>
          <Route path='/' element={<HomePage filteredCategory={filteredCategory}></HomePage>}></Route>
          <Route path='/post-search' element={<PostSearch searchText={searchText} filteredCategoryId={filteredCategory?._id}></PostSearch>}></Route>
          <Route path='/contact-us' element={<ContactUs></ContactUs>}></Route>
          <Route path='/about-us' element={<AboutUs></AboutUs>}></Route>
          <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
          <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
          <Route path='/dashboard' element={<DashboardHome></DashboardHome>}></Route>
          <Route path='/dashboard/movie-list' element={<MovieList></MovieList>}></Route>
          <Route path='/dashboard/userlist' element={<UserList></UserList>}></Route>
          <Route path='/dashboard/publish-post' element={<PublishPost></PublishPost>}></Route>
          <Route path='/dashboard/edit-post/:id' element={<EditPost></EditPost>}></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
          <Route path='/movie-detail/:id' element={<MovieDetails></MovieDetails>}></Route>
          <Route path='/payment' element={<PaymentHome></PaymentHome>}></Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
