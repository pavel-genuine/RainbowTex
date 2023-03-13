
import { Box, Button, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { carOwnerProfile, driverProfile, passengerProfile, passengerProfileUpdate } from '../../api/api'
import AuthMain from '../Authentication/AuthMain'
import CarOwnerProfile from './CarOwner/CarOwnerProfile'
import CarOwnerProfileCompletion from './CarOwner/CarOwnerProfileCompletion'
import DriverProfile from './DriverProfile/DriverProfile'
import DriverProfileCompletion from './DriverProfile/DriverProfileCompletion'
import PassengerInfo from './PassengerProfile/PassengerInfo'
import PassengerProfile from './PassengerProfile/PassengerProfile'

const Profile = ({ open, setOpen }) => {
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



  return (
    <Box>
      {
        localStorage.getItem('role') == 'user' || localStorage.getItem('role') == 'carOwner' || localStorage.getItem('role') == 'driver' ?
          <Box>
            {
              localStorage.getItem('role') == 'user' &&
              <Box>
                {
                  passenger?.name ?
                    <PassengerProfile></PassengerProfile>
                    :
                    <PassengerInfo passengerId={passenger?.id}></PassengerInfo>

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
          :
          <AuthMain open={open} setOpen={setOpen}></AuthMain>
      }
    </Box>
  )
}

export default Profile