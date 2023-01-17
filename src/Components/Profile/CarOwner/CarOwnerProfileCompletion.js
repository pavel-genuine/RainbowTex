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
import { carOwnerProfileUpdate, submitCarOwnerNIDBack, submitCarOwnerNIDFront, } from '../../../api/api';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import { pickUpPoint } from '../../HomePage/FindCars/FindCars';
import throttle from 'lodash.throttle';

const GeneralInfo = ({ handleNext }) => {

  function loadScript(src, position, id) {
    if (!position) {
      return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
  }

  const { register, formState: { errors }, handleSubmit } = useForm();
  const [openMap, setOpenMap] = React.useState(false);
  const [valueOrigin, setValueOrigin] = React.useState(null);
  const [inputValueOrigin, setInputValueOrigin] = React.useState('');
  const [optionsOrigin, setOptionsOrigin] = React.useState([]);
  const [lat, setLat] = React.useState();
  const [lng, setLng] = React.useState();
  const [error, setError] = React.useState('');

  const loaded = React.useRef(false);

  const GOOGLE_MAPS_API_KEY = 'AIzaSyA7Hbtoc7jXPbTNZwdGRzkpt21M3l5YWwE';

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        new window.google.maps.places.AutocompleteService().getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (inputValueOrigin === '') {
      setOptionsOrigin(valueOrigin ? [valueOrigin] : []);
      return undefined;
    }



    fetch({ input: inputValueOrigin, componentRestrictions: { country: 'bd' } },
      (results) => {
        if (active) {
          let newOptions = [];

          if (valueOrigin) {
            newOptions = [valueOrigin];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptionsOrigin(newOptions);
        }
      });



    function initializeGeoCodeOrigin() {
      if (window.google) {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({
          address: valueOrigin?.description
        }, (results, status) => {
          if (status == window.google.maps.GeocoderStatus.OK) {
            console.log(results[0].geometry.location.lat(), 'origin lat');
            console.log(results[0].geometry.location.lng(), 'origin lng');
          }
        });
      }


    }

    initializeGeoCodeOrigin()

    valueOrigin && setError('')


  }, [valueOrigin, inputValueOrigin, fetch]);



  const onSubmit = async (data) => {


    const carOwnerData = {
      name: data?.name,
      officeLocatio: valueOrigin?.description,
      latitude: lat,
      longitude: lng
    }

    !valueOrigin && setError('Location is Required')
    if (valueOrigin) {
      const { data: res } = valueOrigin && await carOwnerProfileUpdate(carOwnerData)
      console.log(res, 'res');
      const ownerId = res?.id
      sessionStorage.setItem('ownerId', ownerId)
    }
    valueOrigin && handleNext()

  }


  return (
    <form className="pt-5 pb-14 relative w-[100%]  mx-auto" onSubmit={handleSubmit(onSubmit)}>

      <div className=''>
        <div className='flex space-y-6 flex-col  '>
          <div className="form-control flex flex-col md:px-1">
            <TextField
              // value={name}
              type="text"
              // className={`w-[100%]`}
              placeholder="Name"
              {...register("name", {
                required: {
                  value: true,
                  message: 'Name is Required'
                }
              })}
              variant="outlined"
            />

            <label className="label">
              {errors?.name?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.name.message}</span>}
            </label>
          </div>

          <div className="form-control flex flex-col">
            {pickUpPoint(optionsOrigin, valueOrigin, setOptionsOrigin, setValueOrigin, setInputValueOrigin, setOpenMap, openMap, "outlined", "Location", "")}

            <label className="label">
              {error && <span className="label-text-alt text-xs text-[brown]">{error}</span>}
            </label>
          </div>
          <div className=''>
            <h1 className='text-sm mb-2 text-justify'> Please take your NID (National Identity) card at your hand to complete your profile. </h1>
            {/* <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="doc"
              name="radio-buttons-group"
              className='text-sm'
            >
              <FormControlLabel value="doc" control={<Radio size='5px' />} label={<Typography fontSize={'12px'}>NID</Typography>} />
              <FormControlLabel value="doc" control={<Radio size='5px' />} label={<Typography fontSize={'12px'}>Driving licence</Typography>} />
              <FormControlLabel value="doc" control={<Radio size='5px' />} label={<Typography fontSize={'12px'}>Vehicle registration paper</Typography>} />
              <FormControlLabel value="doc" control={<Radio size='5px' />} label={<Typography fontSize={'12px'}>Vehicle fitness paper</Typography>} />
              <FormControlLabel value="doc" control={<Radio size='5px' />} label={<Typography fontSize={'12px'}>Vehicle tax token</Typography>} />
            </RadioGroup> */}
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
    const ownerId = sessionStorage.getItem('ownerId')
    console.log(nidFront, 'nid f');
    const formData = new FormData();
    nidFront && formData.append('carownerId', ownerId);
    nidFront && formData.append('nidfront', nidFront);
    if (nidFront) {
      const { data } = await submitCarOwnerNIDFront(formData)
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

  const submitNidBack = async () => {
    const ownerId = sessionStorage.getItem('ownerId')
    const formData = new FormData();
    nidBack && formData.append('carownerId', ownerId);
    nidBack && formData.append('nidback', nidBack);
    if (nidBack) {
      const { data } = await submitCarOwnerNIDBack(formData)
      console.log(data, 'nid');
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
            onClick={() => { submitNidBack() }}
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


const CarOwnerProfileCompletion = () => {



  const [activeStep, setActiveStep] = React.useState(0);

  const navigate = useNavigate()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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

    }
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
            Your Profile is Ready ! </p>

          <p className='text-sm' >
            Now go to your Profile and add your cars & drivers. </p>

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
           <Link>
           <Button to={`/profile`}
              variant="contained"
              size='small'
              onClick={() => { navigate(`/profile`); sessionStorage.clear() }}
              sx={{ mt: 4 }}
            >
              <span>
                <span className=''>Your Profile</span> <ArrowForwardIcon style={{ height: '17px' }}></ArrowForwardIcon>
              </span>
            </Button>
           </Link>
          </div>

        </Box>
      )}
    </Box>
  )
}

export default CarOwnerProfileCompletion