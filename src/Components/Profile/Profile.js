
import { Box, Button, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { carOwnerProfile, driverProfile, passengerProfile, passengerProfileUpdate } from '../../api/api'
import CarOwnerProfile from './CarOwner/CarOwnerProfile'
import CarOwnerProfileCompletion from './CarOwner/CarOwnerProfileCompletion'
import DriverProfile from './DriverProfile/DriverProfile'
import DriverProfileCompletion from './DriverProfile/DriverProfileCompletion'
import PassengerProfile from './PassengerProfile/PassengerProfile'

const Profile = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();

  const location = useLocation();
  const navigate = useNavigate()
  let from = location.state?.from?.pathname || "/";

  const passengerFetcher = async () => {
    const { data } = await passengerProfile()
    return data
  }

  let { data: passenger, isLoading: loading1 } = useQuery(["passengerprofile",], () => passengerFetcher())

  const ownerFetcher = async () => {
    const { data } = await carOwnerProfile()
    return data
  }

  let { data: carOwner, isLoading: loading2 } = useQuery(["ownerprofile",], () => ownerFetcher())

  const driverFetcher = async () => {
    const { data } = await driverProfile()
    return data
  }

  let { data: driver, isLoading: loading3 } = useQuery(["driverprofile",], () => driverFetcher())

  // console.log(driver?.name,'drvr');

  const onSubmit = async (data) => {

    const { data: uData } = await passengerProfileUpdate({...data,id:passenger?.id})
    console.log(uData,'udata');
    navigate(from, { replace: true })
}

  return (
    <Box>
      {
        localStorage.getItem('role') == 'passenger' && 
        <Box>
          {
            passenger?.email ?
              navigate(from, { replace: true })
              :
              <form className="flex  space-y-10  flex-col mb-10 md:px-10 w-[90vw] md:w-[360px] mx-auto pt-40"  onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control flex flex-col">
                <h1 className='mb-5'>Submit Your Information :</h1>
                  <TextField
                      className='mx-auto w-[100%]'
                      type="text"
                      placeholder="Name"
                      {...register("name", {
                          required: {
                              value: true,
                              message: 'Name is Required'
                          }
                      })}
                      variant="standard"
                  />

                  <label className="label">
                      {errors?.name?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.name.message}</span>}
                  </label>
              </div>
              <div className="form-control flex flex-col">
                  <TextField
                      className='mx-auto w-[100%]'
                      type="email"
                      placeholder="Mail"
                      {...register("email", {
                          required: {
                              value: true,
                              message: 'Mail is Required'
                          }
                      })}
                      variant="standard"
                  />

                  <label className="label">
                      {errors?.email?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.email.message}</span>}
                  </label>
              </div>

              <Button  type='submit' className='rounded-md px-4 text-sm py-2 text-white bg-primary' variant='contained' autoFocus
              >
                  Submit
              </Button>
          </form>
          }
        </Box>
      }
      {
        localStorage.getItem('role') == 'carOwner' && 
        <Box>
          {
            carOwner?.nidBack ?
              <CarOwnerProfile></CarOwnerProfile>
              :
              <CarOwnerProfileCompletion></CarOwnerProfileCompletion>
          }
        </Box>
      }
      {
        localStorage.getItem('role') == 'driver' && 
        <Box>
          {
            driver?.drivingLicense ?
              <DriverProfile></DriverProfile>
              :
              <DriverProfileCompletion></DriverProfileCompletion>
          }
        </Box>
      }
    </Box>
  )
}

export default Profile