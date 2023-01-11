import { Button, FormControlLabel, Paper, Radio, RadioGroup, Step, StepContent, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box } from '@mui/system';
import { useState } from 'react';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import { carOwnerProfileUpdate, submitCarOwnerNID } from '../../../api/api';

const GeneralInfo = ({ handleNext }) => {
  const { register, formState: { errors }, handleSubmit } = useForm();

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')

  const onSubmit = async (data) => {
    handleNext()
    const {data:res}=await carOwnerProfileUpdate(data)
console.log(res,'res comple');
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

          <div className="form-control flex flex-col">
            <TextField
              type="text"
              // className={`w-[100%] md:w-[350px]`}
              placeholder="Location"
              {...register("address", {
                required: {
                  value: true,
                  message: 'Location is Required'
                }
              })}
              variant="standard"
            />

            <label className="label">
              {errors?.address?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.address?.message}</span>}
            </label>
          </div>
          <div className=''>
            <h1 className='text-sm mb-2 text-justify'> Please take your NID (National Identity) card at your hand to commlete your profile. </h1>
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


const NIDUploaderFront = () => {

  return (
    <div className="h-[280px] ">
      <h1 className='mt-3 mb-7 text-sm'>Upload a clear image of your NID card (front-side).</h1>
      <input
        id="file-upload"
        className="VideoInput_input hidden"
        type="file"
        accept="image/*"
      />
      <div>
        <div class="flex justify-center items-center  px-6 pt-5 pb-6">
          <div class="space-y-1 text-center">
            <div class="flex text-sm text-gray-600">
              <label for="file-upload" class="relative cursor-pointer rounded-md font-medium hover:text-primary">
                <AssignmentIndOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1.3, scale: "4" }} ></AssignmentIndOutlinedIcon>
                <p className=' cursor-pointer mt-10 border rounded border-primary hover:bg-primary text-primary hover:text-white text-xs px-2 py-1' >Upload NID</p>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
const NIDUploaderBack = () => {


  return (
    <div className="h-[280px] ">
      <h1 className='mt-3 mb-7 text-sm'>Upload a clear image of your NID card (Back-side).</h1>
      <input
        id="file-upload"
        className="VideoInput_input hidden"
        type="file"
        accept="image/*"
      />
      <div>
        <div class="flex justify-center  items-center  border- px-6 pt-5 pb-6  order-2 border-dashed border-primary rounded-md">
          <div class="space-y-1 text-center">
            <div class="flex text-sm text-gray-600">
              <label for="file-upload" class="relative cursor-pointer rounded-md font-medium hover:text-primary">
                <AssignmentOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1.3, scale: "4" }} ></AssignmentOutlinedIcon>
                <p className=' cursor-pointer mt-10 border rounded border-primary hover:bg-primary text-primary hover:text-white text-xs px-2 py-1' >Upload NID</p>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}



const CarOwnerProfileCompletion = () => {



  const [activeStep, setActiveStep] = React.useState(0);

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
      description: <NIDUploaderFront></NIDUploaderFront>

    },
    {
      label: 'NID card (back-side)',
      description: <NIDUploaderBack></NIDUploaderBack>

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
                <div>
                  {index > 0 &&
                    <div className='relative flex justify-between'>
                      <Button
                        disabled={index === 0}
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
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        <span>
                          <span className=''>Save & Next</span> <ArrowForwardIcon style={{ height: '17px' }}></ArrowForwardIcon>
                        </span>
                      </Button>
                    </div>
                  }
                </div>
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
            <Button
              variant="contained"
              size='small'
              onClick={handleNext}
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

export default CarOwnerProfileCompletion