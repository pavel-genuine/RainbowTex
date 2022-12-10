import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const RequireAuth = ({children}) => {
    const location = useLocation();
    // const navigate =useNavigate()
   
    if(!localStorage.getItem('email')){
        return <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>
    }
    return children;
};

export default RequireAuth;