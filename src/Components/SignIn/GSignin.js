import React from 'react'
import { useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function GSignin() {
  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate()
  useEffect(() => {

    localStorage.setItem('name', (queryParams.get('name')));
    localStorage.setItem('email', (queryParams.get('email')));
    localStorage.setItem('loginToken', (queryParams.get('logintoken')));

    setTimeout(() => {
      navigate('/')
    }, 1000);
    setTimeout(() => {
      toast.success('SignIn Successfull')
    }, 500);

  }, [])

  return (
    <div>
      <Toaster></Toaster>

    </div>
  )
}

export default GSignin