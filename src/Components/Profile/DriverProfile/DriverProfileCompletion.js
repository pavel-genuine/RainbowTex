import { Button, FormControlLabel, IconButton, ImageListItem, ImageListItemBar, Paper, Radio, RadioGroup, Step, StepContent, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box } from '@mui/system';
import { useState } from 'react';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import { carOwnerProfileUpdate, driverProfileUpdate, submitCarOwnerNID, submitCarOwnerNIDBack, submitCarOwnerNIDFront, submitDriverNIDBack, submitDriverNIDFront } from '../../../api/api';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const GeneralInfo = ({ handleNext }) => {
  const { register, formState: { errors }, handleSubmit } = useForm();

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data?.name);
    const { data: res } = await driverProfileUpdate(formData)
    const driverId = res?.id
    sessionStorage.setItem('driverId', driverId)
    handleNext()
  }


  return (
    <form className="flex h-[280px] justify-center items-center flex-col relative  mx-auto" onSubmit={handleSubmit(onSubmit)}>

      <div className=''>
        <div className='flex space-y-6 flex-col  '>
          <div className="form-control flex flex-col">
            <TextField
              // value={name}
              type="text"
              // className={`w-[100%] md:w-[350px]`}
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
          <div className=''>
            <h1 className='text-sm  text-justify mb-2 mt-5'> Please take these documments  at your hand to complete your profile. </h1>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="doc"
              name="radio-buttons-group"
              className='text-sm'
            >
              <FormControlLabel value="doc" control={<Radio size='5px' />} label={<Typography fontSize={'12px'}>NID card</Typography>} />
              <FormControlLabel value="doc" control={<Radio size='5px' />} label={<Typography fontSize={'12px'}>Driving licence</Typography>} />
              {/* <FormControlLabel value="doc" control={<Radio size='5px' />} label={<Typography fontSize={'12px'}>Vehicle registration paper</Typography>} />
              <FormControlLabel value="doc" control={<Radio size='5px' />} label={<Typography fontSize={'12px'}>Vehicle fitness paper</Typography>} />
              <FormControlLabel value="doc" control={<Radio size='5px' />} label={<Typography fontSize={'12px'}>Vehicle tax token</Typography>} /> */}
            </RadioGroup>
          </div>
        </div>
        <div className='absolute right-0 top-[100%]'>

          <Button id='passenger-sign'

            className=''
            // disabled={submit? true : false}
            type='submit' size='small'
            variant="contained"> <span className=''>Save & Next</span> <ArrowForwardIcon style={{ height: '17px' }}></ArrowForwardIcon></Button>
        </div>

      </div>

    </form>

  )
}



const NIDUploaderFront = ({ handleBack, handleNext }) => {

  const [nidFrontRender, setNidFrontRender] = useState()

  const [nidFront, setNidFront] = useState()

  const [error, setError] = useState()


  useEffect(() => {
    setNidFrontRender(() => sessionStorage.getItem('nidFront'))

  }, [setNidFrontRender, nidFrontRender])


  const handleNidFront = (e) => {

    const file = e.target.files[0];
    setNidFront(() => file)
    const image = URL.createObjectURL(file)
    sessionStorage.setItem('nidFront', image)
    setNidFrontRender(() => sessionStorage.getItem('nidFront'))
    setError('')

  }

  const submitNidFront = async () => {
    const driverId = sessionStorage.getItem('driverId')
    const formData = new FormData();
    nidFront && formData.append('driverId', driverId);
    nidFront && formData.append('nidfront', nidFront);
    if (nidFront) {
      const { data } = await submitDriverNIDFront(formData)
      console.log(data, 'nid');
    }
    !nidFrontRender && setError('Nid card (front-side) is required')
    nidFrontRender && handleNext()

  }


  return (
    <div className="h-[350px] ">
      <h1 className='mt-3 mb-7 text-sm'>Upload a clear image of your NID card (front-side).</h1>
      <div className='relative'>
        <input
          id="nidFront"
          className=" hidden"
          type="file"
          accept="image/*"
          onChange={handleNidFront}
        />
        <div>

          {!nidFrontRender ?

            <div className="flex justify-center  items-center  px-6 pt-5 pb-6 mb-20">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="nidFront" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
                    <AssignmentOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1.3, scale: "4" }} ></AssignmentOutlinedIcon>
                    <p className=' cursor-pointer mt-10 border rounded border-primary hover:bg-primary text-primary hover:text-white text-xs px-2 py-1' >Upload document</p>
                  </label>
                </div>
              </div>
            </div>
            :
            <div className="flex justify-center  items-center pb-2 ">
              <div>
                <ImageListItem sx={{
                  width: 220,
                  height: 160,
                }}
                >
                  <img
                    src={nidFrontRender}
                    loading="lazy"
                    alt='nid'
                  />
                  <ImageListItemBar
                    sx={{
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    }}
                    position="top"
                    actionIcon={
                      <IconButton
                        onClick={() => setNidFrontRender(sessionStorage.removeItem('nidFront'))}
                        sx={{ color: 'white' }}
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                    actionPosition="left"
                  />
                </ImageListItem>
              </div>
            </div>
          }

        </div>
        {error && <p className='text-sm text-[brown] pl-[20%]'>{error}</p>}
        <div className='relative flex justify-between mt-5'>
          <Button
            size='small'
            onClick={handleBack}
            sx={{ mt: 1, mr: 1 }}
          >
            <span>
              <ArrowBackIcon style={{ height: '17px' }}></ArrowBackIcon>  <span className=''>back</span>
            </span>
          </Button>
          <Button
            variant="contained"
            size='small'
            onClick={() => { submitNidFront() }}
            sx={{ mt: 1 }}
          >
            <span>
              <span className=''>Save & Next</span> <ArrowForwardIcon style={{ height: '17px' }}></ArrowForwardIcon>
            </span>
          </Button>
        </div>

      </div>
    </div>

  )
}

const NIDUploaderBack = ({ handleBack, handleNext }) => {

  const [nidBackRender, setNidBackRender] = useState()

  const [nidBack, setNidBack] = useState()

  const [error, setError] = useState()


  useEffect(() => {
    setNidBackRender(() => sessionStorage.getItem('nidBack'))

  }, [setNidBackRender, nidBackRender])


  const handleNidBack = (e) => {

    const file = e.target.files[0];
    setNidBack(() => file)
    const image = URL.createObjectURL(file)
    sessionStorage.setItem('nidBack', image)
    setNidBackRender(() => sessionStorage.getItem('nidBack'))
    setError('')

  }

  const submitNidFront = async () => {
    const driverId = sessionStorage.getItem('driverId')
    const formData = new FormData();
    nidBack && formData.append('driverId', driverId);
    nidBack && formData.append('nidback', nidBack);
    if (nidBack) {
      const { data } = await submitDriverNIDBack(formData)
    }
    !nidBackRender && setError('Nid card (back-side) is required')
    nidBackRender && handleNext()

  }


  return (
    <div className="h-[350px] ">
      <h1 className='mt-3 mb-7 text-sm'>Upload a clear image of your NID card (back-side).</h1>
      <div className='relative'>
        <input
          id="nidBack"
          className=" hidden"
          type="file"
          accept="image/*"
          onChange={handleNidBack}
        />
        <div>

          {!nidBackRender ?

            <div className="flex justify-center  items-center  px-6 pt-5 pb-6 mb-20">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="nidBack" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
                    <AssignmentOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1.3, scale: "4" }} ></AssignmentOutlinedIcon>
                    <p className=' cursor-pointer mt-10 border rounded border-primary hover:bg-primary text-primary hover:text-white text-xs px-2 py-1' >Upload document</p>
                  </label>
                </div>
              </div>
            </div>
            :
            <div className="flex justify-center  items-center pb-2 ">
              <div>
                <ImageListItem sx={{
                  width: 220,
                  height: 160,
                }}
                >
                  <img
                    src={nidBackRender}
                    loading="lazy"
                    alt='nid'
                  />
                  <ImageListItemBar
                    sx={{
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    }}
                    position="top"
                    actionIcon={
                      <IconButton
                        onClick={() => setNidBackRender(sessionStorage.removeItem('nidBack'))}
                        sx={{ color: 'white' }}
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                    actionPosition="left"
                  />
                </ImageListItem>
              </div>
            </div>
          }

        </div>
        {error && <p className='text-sm text-[brown] pl-[20%]'>{error}</p>}
        <div className='relative flex justify-between mt-5'>
          <Button
            size='small'
            onClick={handleBack}
            sx={{ mt: 1, mr: 1 }}
          >
            <span>
              <ArrowBackIcon style={{ height: '17px' }}></ArrowBackIcon>  <span className=''>back</span>
            </span>
          </Button>
          <Button
            variant="contained"
            size='small'
            onClick={() => { submitNidFront() }}
            sx={{ mt: 1 }}
          >
            <span>
              <span className=''>Save & Next</span> <ArrowForwardIcon style={{ height: '17px' }}></ArrowForwardIcon>
            </span>
          </Button>
        </div>

      </div>
    </div>

  )
}
const DrivingLicense = ({ handleBack, handleNext }) => {

  const [licenseRender, setLicenseRender] = useState()

  const [license, setLicense] = useState()

  const [error, setError] = useState()


  useEffect(() => {
    setLicenseRender(() => sessionStorage.getItem('license'))

  }, [setLicenseRender, licenseRender])


  const handleLicense = (e) => {

    const file = e.target.files[0];
    setLicense(() => file)
    const image = URL.createObjectURL(file)
    sessionStorage.setItem('license', image)
    setLicenseRender(() => sessionStorage.getItem('license'))
    setError('')

  }

  const submitLicense = async () => {
    const driverId = sessionStorage.getItem('driverId')
    const formData = new FormData();
    license && formData.append('id', driverId);
    license && formData.append('license', license);
    if (license) {
      const { data } = await driverProfileUpdate(formData)
      console.log(data, 'license');
    }
    !licenseRender && setError('License is required')
    licenseRender && handleNext()

  }


  return (
    <div className="h-[350px] ">
      <h1 className='mt-3 mb-7 text-sm'>Upload a clear image of your NID card (back-side).</h1>
      <div className='relative'>
        <input
          id="license"
          className=" hidden"
          type="file"
          accept="image/*"
          onChange={handleLicense}
        />
        <div>

          {!licenseRender ?

            <div className="flex justify-center  items-center  px-6 pt-5 pb-6 mb-20">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="license" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
                    <AssignmentOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1.3, scale: "4" }} ></AssignmentOutlinedIcon>
                    <p className=' cursor-pointer mt-10 border rounded border-primary hover:bg-primary text-primary hover:text-white text-xs px-2 py-1' >Upload document</p>
                  </label>
                </div>
              </div>
            </div>
            :
            <div className="flex justify-center  items-center pb-2 ">
              <div>
                <ImageListItem sx={{
                  width: 220,
                  height: 160,
                }}
                >
                  <img
                    src={licenseRender}
                    loading="lazy"
                    alt='license'
                  />
                  <ImageListItemBar
                    sx={{
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    }}
                    position="top"
                    actionIcon={
                      <IconButton
                        onClick={() => setLicenseRender(sessionStorage.removeItem('license'))}
                        sx={{ color: 'white' }}
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                    actionPosition="left"
                  />
                </ImageListItem>
              </div>
            </div>
          }

        </div>
        {error && <p className='text-sm text-[brown] text-center '>{error}</p>}
        <div className='relative flex justify-between mt-5'>
          <Button
            size='small'
            onClick={handleBack}
            sx={{ mt: 1, mr: 1 }}
          >
            <span>
              <ArrowBackIcon style={{ height: '17px' }}></ArrowBackIcon>  <span className=''>back</span>
            </span>
          </Button>
          <Button
            variant="contained"
            size='small'
            onClick={() => { submitLicense() }}
            sx={{ mt: 1 }}
          >
            <span>
              <span className=''>Save & Next</span> <ArrowForwardIcon style={{ height: '17px' }}></ArrowForwardIcon>
            </span>
          </Button>
        </div>

      </div>
    </div>

  )
}


const DriverProfileCompletion = () => {



  const [activeStep, setActiveStep] = React.useState(0);

  const navigate = useNavigate()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const steps = [
    {
      label: 'General Information',
      description: <GeneralInfo handleNext={handleNext}></GeneralInfo>
    },
    {
      label: 'NID card (front-side)',
      description: <NIDUploaderFront handleNext={handleNext} handleBack={handleBack} ></NIDUploaderFront>

    },
    {
      label: 'NID card (back-side)',
      description: <NIDUploaderBack handleNext={handleNext} handleBack={handleBack}></NIDUploaderBack>

    },
    {
      label: 'Driving License',
      description: <DrivingLicense handleNext={handleNext} handleBack={handleBack}></DrivingLicense>

    },
  ]


  return (
    <Box className=' py-20 w-[95vw] mb-10 md:pt-28 flex justify-center  flex-col relative md:w-[400px] mx-auto' sx={{ maxWidth: 400 }}>
      <h1 className='md:text-xl text-md text-primary mb-7'>Complete Your Profile </h1>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel >
              <span style={{ fontWeight: 'bold' }} className='text-primary'>{step.label}</span>
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>

              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Box className='space-y-5 mt-10 pl-7' >
          <p className='text-[green] bg-[green] bg-opacity-20 w-[80%] text-center px-2 py-1 rounded-md' >
            Your Profile is Ready !
          </p>          
          <div className='relative flex justify-between w-[80%]'>
            <Button
              size='small'
              onClick={handleBack}
              sx={{ mt: 4 }}
            >
              <span>
                <ArrowBackIcon style={{ height: '17px' }}></ArrowBackIcon>  <span className=''>back</span>
              </span>
            </Button>
            <Button
              variant="contained"
              size='small'
              onClick={() => { navigate(`/profile`); sessionStorage.clear() }}
              sx={{ mt: 4 }}
            >
              <span>
                <span className=''>Your Profile</span> <ArrowForwardIcon style={{ height: '17px' }}></ArrowForwardIcon>
              </span>
            </Button>
          </div>

        </Box>
      )}
    </Box>
  )
}

export default DriverProfileCompletion