import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const RequireAdmin = ({children}) => {
    const location = useLocation();
    // const navigate =useNavigate()
   
    if(!localStorage.getItem('isAdmin')){
        return <Navigate to="/" state={{ from: location }} replace></Navigate>
    }
    return children;
};

export default RequireAdmin;