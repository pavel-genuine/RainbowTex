
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getRefreshToken } from '../../api/api';

const RequireAuth = ({ children,setOpen,open}) => {
    const location = useLocation();
    // const [openAuth, setOpenAuth] = useState(false)

    useEffect(() => {

        const getToken = async () => {
            await getRefreshToken().then(res => {
                !res?.data?.accessToken && setOpen(true)
            }).catch(error => {
                setOpen(true)
            })
        }
        getToken()
    }, [])

    if (open) {
        return <Navigate to="/auth" state={{ from: location }} replace></Navigate>
    }
    return children;
};

export default RequireAuth;





