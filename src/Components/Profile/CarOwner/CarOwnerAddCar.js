import { Box, Dialog, Divider, IconButton, ImageList, ImageListItem, ImageListItemBar, Slide } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormControlLabel, Paper, Radio, RadioGroup, Step, StepContent, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { addCar, uploadCarFitnessPaper, uploadCarImage, uploadCarRegistrationPaper, uploadCarTaxToken } from '../../../api/api';
import throttle from 'lodash.throttle';
import { pickUpPoint } from '../../HomePage/FindCars/FindCars';


export const ArrowIcon = () => {
    return (
        <span>
            <IconButton className='w-10 h-10' style={{ color: 'white' }} aria-label="back">
                <ArrowBackIcon />
            </IconButton>
        </span>
    )

}

const GeneralInfo = ({ handleNext }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();


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

    const [openMap, setOpenMap] = React.useState(false);
    const [valueOrigin, setValueOrigin] = React.useState(null);
    const [inputValueOrigin, setInputValueOrigin] = React.useState('');
    const [optionsOrigin, setOptionsOrigin] = React.useState([]);
    const [lat, setLat] = React.useState();
    const [lng, setLng] = React.useState();
    const [error, setError] = React.useState();

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


        const carData = {
            brand: data?.brand,
            model: data?.model,
            pickupArea: valueOrigin?.description,
            latitude: lat,
            longitude: lng,
            year: data?.year,
            seat: data?.seat,
            carType: data?.carType,
            unitPrice:data?.unitPrice
        }

        !valueOrigin && setError('Location is Required')

        if (valueOrigin) {
            const { data: res } = await addCar(carData)
            const carId = res?.id

            sessionStorage.setItem('carId', carId)
        }

        valueOrigin && handleNext()
    }

    return (
        <form className="pt-5 pb-14 relative w-[100%]  mx-auto" onSubmit={handleSubmit(onSubmit)}>

            <div className=''>
                <div className='flex space-y-6 flex-col  '>
                    <div className="form-control flex flex-col">
                        <TextField
                            type="text"
                            placeholder="Brand"
                            {...register("brand", {
                                required: {
                                    value: true,
                                    message: 'Brand is Required'
                                }
                            })}
                            variant="outlined"
                        />

                        <label className="label">
                            {errors?.brand?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.brand.message}</span>}
                        </label>
                    </div>

                    <div className="form-control flex flex-col">
                        <TextField
                            type="text"
                            // className={`w-[100%] md:w-[350px]`}
                            placeholder="Model"
                            {...register("model", {
                                required: {
                                    value: true,
                                    message: 'Model is Required'
                                }
                            })}
                            variant="outlined"
                        />

                        <label className="label">
                            {errors?.model?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.model?.message}</span>}
                        </label>
                    </div>
                    <div className="form-control flex flex-col">
                        <TextField
                            type="text"
                            // className={`w-[100%] md:w-[350px]`}
                            placeholder="Year"
                            {...register("year", {
                                required: {
                                    value: true,
                                    message: 'Year is Required'
                                }
                            })}
                            variant="outlined"
                        />

                        <label className="label">
                            {errors?.year?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.year?.message}</span>}
                        </label>
                    </div>
                    <div className="form-control flex flex-col">
                        <TextField
                            type="text"
                            placeholder="Seat"
                            {...register("seat", {
                                required: {
                                    value: true,
                                    message: 'Seat is Required'
                                }
                            })}
                            variant="outlined"
                        />
                        <label className="label">
                            {errors?.seat?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.seat?.message}</span>}
                        </label>
                    </div>
                    <div className="form-control flex flex-col">
                        {pickUpPoint(optionsOrigin, valueOrigin, setOptionsOrigin, setValueOrigin, setInputValueOrigin, setOpenMap, openMap, "outlined", "Location", "")}

                        <label className="label">
                            {error && <span className="label-text-alt text-xs text-[brown]">{error}</span>}
                        </label>
                    </div>
                    <div className="form-control flex flex-col">
                        <TextField
                            type="text"
                            placeholder="Car Type"
                            {...register("carType", {
                                required: {
                                    value: true,
                                    message: 'Car Type is Required'
                                }
                            })}
                            variant="outlined"
                        />
                        <label className="label">
                            {errors?.carType?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.carType?.message}</span>}
                        </label>
                    </div>
                    <div className="form-control flex flex-col">
                        <TextField
                            type="text"
                            placeholder="Unit Price"
                            {...register("unitPrice", {
                                required: {
                                    value: true,
                                    message: 'Unit price is Required'
                                }
                            })}
                            variant="outlined"
                        />
                        <label className="label">
                            {errors?.unitPrice?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.unitPrice?.message}</span>}
                        </label>
                    </div>

                </div>
                <div className='absolute right-0 top-[95%]'>
                    <Button
                        type='submit' size='small'
                        variant="contained"> <span className=''>Save & Next</span> <ArrowForwardIcon style={{ height: '17px' }}></ArrowForwardIcon></Button>
                </div>
            </div>
        </form>

    )
}


const UploadCarImages = ({ handleNext, handleBack }) => {

    const [vehicleImage, setVehicleIamge] = useState()
    const [vehicleImage2, setVehicleIamge2] = useState()
    const [vehicleImage3, setVehicleIamge3] = useState()
    const [vehicleImage4, setVehicleIamge4] = useState()
    const [image1, setIamge1] = useState()
    const [image2, setIamge2] = useState()
    const [image3, setIamge3] = useState()
    const [image4, setIamge4] = useState()


    useEffect(() => {
        setVehicleIamge2(() => sessionStorage.getItem('vehicleImage2'))
        setVehicleIamge3(() => sessionStorage.getItem('vehicleImage3'))
        setVehicleIamge(() => sessionStorage.getItem('vehicleImage'))
        setVehicleIamge4(() => sessionStorage.getItem('vehicleImage4'))

    }, [setVehicleIamge, setVehicleIamge2, setVehicleIamge3, setVehicleIamge4])


    const handleVehicleImage = (e) => {

        const file = e.target.files[0];
        setIamge1(() => file)
        const image = URL.createObjectURL(file)
        sessionStorage.setItem('vehicleImage', image)
        setVehicleIamge(() => sessionStorage.getItem('vehicleImage'))
    }
    const handleVehicleImage2 = (e) => {

        const file = e.target.files[0];
        setIamge2(() => file)

        const image = URL.createObjectURL(file)
        sessionStorage.setItem('vehicleImage2', image)
        setVehicleIamge2(() => sessionStorage.getItem('vehicleImage2'))

    }
    const handleVehicleImage3 = (e) => {

        const file = e.target.files[0];
        setIamge3(() => file)

        const image = URL.createObjectURL(file)
        sessionStorage.setItem('vehicleImage3', image)
        setVehicleIamge3(() => sessionStorage.getItem('vehicleImage3'))

    }

    const handleVehicleImage4 = (e) => {
        const file = e.target.files[0];
        setIamge4(() => file)
        const image = URL.createObjectURL(file)
        sessionStorage.setItem('vehicleImage4', image)
        setVehicleIamge4(() => sessionStorage.getItem('vehicleImage4'))
    }

    const submitCarImages = async () => {

        const carId = sessionStorage.getItem('carId')

        const formData = new FormData();
        formData.append('carId', carId);
        image1 && formData.append('carpicture', image1);
        image2 && formData.append('carpicture', image2);
        image3 && formData.append('carpicture', image3);
        image4 && formData.append('carpicture', image4);

        if (formData.has('carpicture')) {
            const { data } = await uploadCarImage(formData)
        }

    }


    return (
        <div className='pt-7 relative'>
            <div>
                <h1 className='text-sm mb-7'>Upload vehicle Images (max-4).</h1>
                <div className={`grid grid-cols-2 gap-3 ${vehicleImage2 ? 'mb-[14vh]' : 'mb-[-5vh]'}`}>
                    <div className='relative'>
                        <input
                            id="file-upload"
                            className="VideoInput_input hidden"
                            type="file"
                            accept="image/*"
                            onChange={handleVehicleImage}
                        />
                        <div className='flex space-x-2'>


                            {!vehicleImage ?
                                <div>
                                    <div className=" px-6 pt-5 pb-6">
                                        <div className="space-y-1 text-center">
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
                                                    <AddPhotoAlternateIcon sx={{ stroke: "#ffffff", strokeWidth: 1.3, scale: "2" }} ></AddPhotoAlternateIcon>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :

                                <div>
                                    <img className='absolute right-[0%] w-[160px] h-[120px] rounded-md' src={vehicleImage} alt="" srcset="" />

                                    <div className='relative'>
                                        <IconButton onClick={() => setVehicleIamge(sessionStorage.removeItem('vehicleImage'))} className='w-6 h-6 absolute md:left-[20%]' style={{ color: 'white' }} aria-label="back">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            }

                        </div>

                    </div>
                    <div className='relative'>
                        <input
                            id="file-upload2"
                            className="VideoInput_input hidden"
                            type="file"
                            accept="image/*"
                            onChange={handleVehicleImage2}
                        />
                        <div className='flex space-x-2'>


                            {!vehicleImage2 ?
                                <div>
                                    {vehicleImage && <div>
                                        <div className=" px-6 pt-5 pb-6">
                                            <div className="space-y-1 text-center">
                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="file-upload2" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
                                                        <AddPhotoAlternateIcon sx={{ stroke: "#ffffff", strokeWidth: 1.3, scale: "2" }} ></AddPhotoAlternateIcon>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                                :
                                <div>
                                    <img className='absolute right-[0%] w-[160px] h-[120px]  rounded-md' src={vehicleImage2} alt="" srcset="" />

                                    <div className='relative'>
                                        <IconButton onClick={() => setVehicleIamge2(sessionStorage.removeItem('vehicleImage2'))} className='w-6 h-6 absolute md:left-[20%]' style={{ color: 'white' }} aria-label="back">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            }

                        </div>

                    </div>

                    <div className='relative mt-24'>
                        <input
                            id="file-upload3"
                            className="VideoInput_input hidden"
                            type="file"
                            accept="image/*"
                            onChange={handleVehicleImage3}
                        />
                        <div className='flex space-x-2'>

                            {!vehicleImage3 ?
                                <div>
                                    {vehicleImage2 && <div>
                                        <div className=" px-6 pt-5 pb-6">
                                            <div className="space-y-1 text-center">
                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="file-upload3" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
                                                        <AddPhotoAlternateIcon sx={{ stroke: "#ffffff", strokeWidth: 1.3, scale: "2" }} ></AddPhotoAlternateIcon>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                                :
                                <div>
                                    <img className='absolute right-[0%] w-[160px] h-[120px]  rounded-md' src={vehicleImage3} alt="" srcset="" />

                                    <div className='relative'>
                                        <IconButton onClick={() => setVehicleIamge3(sessionStorage.removeItem('vehicleImage3'))} className='w-6 h-6 absolute md:left-[20%]' style={{ color: 'white' }} aria-label="back">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            }

                        </div>

                    </div>
                    <div className='relative mt-24'>
                        <input
                            id="file-upload4"
                            className="VideoInput_input hidden"
                            type="file"
                            accept="image/*"
                            onChange={handleVehicleImage4}
                        />
                        <div className='flex space-x-2'>

                            {!vehicleImage4 ?
                                <div>
                                    {vehicleImage3 && <div>
                                        <div className=" px-6 pt-5 pb-6">
                                            <div className="space-y-1 text-center">
                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="file-upload4" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
                                                        <AddPhotoAlternateIcon sx={{ stroke: "#ffffff", strokeWidth: 1.3, scale: "2" }} ></AddPhotoAlternateIcon>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                                :
                                <div>
                                    <img className='absolute right-[0%] w-[160px] h-[120px]  rounded-md' src={vehicleImage4} alt="" srcset="" />

                                    <div className='relative'>
                                        <IconButton onClick={() => setVehicleIamge4(sessionStorage.removeItem('vehicleImage4'))} className='w-6 h-6 absolute md:left-[20%]' style={{ color: 'white' }} aria-label="back">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            }

                        </div>

                    </div>

                </div>
            </div>
            <div>
                <Divider />
                <h1 className={`text-sm mt-6 mb-2 text-justify `}> Please take these documents at your hand to comlete the car adding process: </h1>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="doc"
                    name="radio-buttons-group"
                    className='text-sm'
                >
                    <FormControlLabel value="doc" control={<Radio size='5px' />} label={<Typography fontSize={'12px'}>Vehicle registration paper</Typography>} />
                    <FormControlLabel value="doc" control={<Radio size='5px' />} label={<Typography fontSize={'12px'}>Vehicle fitness paper</Typography>} />
                    <FormControlLabel value="doc" control={<Radio size='5px' />} label={<Typography fontSize={'12px'}>Vehicle tax token</Typography>} />
                </RadioGroup>

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
                        onClick={() => { handleNext(); submitCarImages() }}
                        sx={{ mt: 1, mr: 1 }}
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


const RegistrationPaper = ({ handleBack, handleNext }) => {

    const [registrationPaperRender, setRegistrationPaperRender] = useState()

    const [registrationPaper, setRegistrationPaper] = useState()

    const [error, setError] = useState()


    useEffect(() => {
        setRegistrationPaperRender(() => sessionStorage.getItem('registrationPaper'))

    }, [setRegistrationPaperRender, registrationPaperRender])


    const handleCarRegistrationPaper = (e) => {

        const file = e.target.files[0];
        setRegistrationPaper(() => file)
        const image = URL.createObjectURL(file)
        sessionStorage.setItem('registrationPaper', image)
        setRegistrationPaperRender(() => sessionStorage.getItem('registrationPaper'))
        setError('')

    }

    const submitCarRegistrationPaper = async () => {
        const carId = sessionStorage.getItem('carId')
        // console.log(fitnessPaper,'fitnessPaper');
        const formData = new FormData();
        if (registrationPaper) {
            formData.append('carId', carId);
            formData.append('registration', registrationPaper);
            const { data } = await uploadCarRegistrationPaper(formData)
        }
        registrationPaperRender && handleNext()
        !setRegistrationPaperRender && setError('Registration Paper is required')

    }


    return (
        <div className="h-[350px] ">
            <h1 className='mt-3 mb-7 text-sm'>Upload a clear image of the vehicle fitness paper.</h1>
            <div className='relative'>
                <input
                    id="registrationPaper"
                    className=" hidden"
                    type="file"
                    accept="image/*"
                    onChange={handleCarRegistrationPaper}
                />
                <div>

                    {!registrationPaperRender ?

                        <div className="flex justify-center  items-center  px-6 pt-5 pb-6 mb-20">
                            <div className="space-y-1 text-center">
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="registrationPaper" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
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
                                        src={registrationPaperRender}
                                        loading="lazy"
                                        alt='registrationPaper'
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
                                                onClick={() => setRegistrationPaperRender(sessionStorage.removeItem('registrationPaper'))}
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
                        onClick={() => { submitCarRegistrationPaper() }}
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
const FitnessPaper = ({ handleBack, handleNext }) => {

    const [fitnessPaperRender, setFitnessPaperRender] = useState()

    const [fitnessPaper, setFitnessPaper] = useState()

    const [error, setError] = useState()


    useEffect(() => {
        setFitnessPaperRender(() => sessionStorage.getItem('fitnessPaper'))

    }, [setFitnessPaperRender, fitnessPaperRender])


    const handleCarFitnessPaper = (e) => {

        const file = e.target.files[0];
        setFitnessPaper(() => file)
        const image = URL.createObjectURL(file)
        sessionStorage.setItem('fitnessPaper', image)
        setFitnessPaperRender(() => sessionStorage.getItem('fitnessPaper'))
        setError('')

    }

    const submitCarFitnessPaper = async () => {
        const carId = sessionStorage.getItem('carId')
        // console.log(fitnessPaper,'fitnessPaper');
        const formData = new FormData();
        if (fitnessPaper) {
            formData.append('carId', carId);
            formData.append('fitnesspaper', fitnessPaper);
            const { data } = await uploadCarFitnessPaper(formData)
        }
        fitnessPaperRender && handleNext()
        !fitnessPaperRender && setError('Fitness Paper is required')

    }


    return (
        <div className="h-[350px] ">
            <h1 className='mt-3 mb-7 text-sm'>Upload a clear image of the vehicle fitness paper.</h1>
            <div className='relative'>
                <input
                    id="fitnessPaper"
                    className="VideoInput_input hidden"
                    type="file"
                    accept="image/*"
                    onChange={handleCarFitnessPaper}
                />
                <div>

                    {!fitnessPaperRender ?

                        <div className="flex justify-center  items-center  px-6 pt-5 pb-6 mb-20">
                            <div className="space-y-1 text-center">
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="fitnessPaper" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
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
                                        src={fitnessPaperRender}
                                        loading="lazy"
                                        alt='fitness'
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
                                                onClick={() => setFitnessPaperRender(sessionStorage.removeItem('fitnessPaper'))}
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
                        onClick={() => { submitCarFitnessPaper() }}
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

const TaxToken = ({ handleBack, handleNext }) => {

    const [taxTokenRender, setTaxTokenRender] = useState()

    const [taxToken, setTaxToken] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        setTaxTokenRender(() => sessionStorage.getItem('taxToken'))

    }, [setTaxTokenRender, taxTokenRender])



    const handleCarTaxToken = (e) => {
        const file = e.target.files[0];
        setTaxToken(() => file)
        const image = URL.createObjectURL(file)
        sessionStorage.setItem('taxToken', image)
        setTaxTokenRender(() => sessionStorage.getItem('taxToken'))
        setError(() => '')
    }

    const submitCarTaxToken = async () => {
        const carId = sessionStorage.getItem('carId')

        const formData = new FormData();
        taxToken && formData.append('carId', carId);
        taxToken && formData.append('taxtoken', taxToken);

        if (taxToken) {
            const { data } = await uploadCarTaxToken(formData)
        }
        taxTokenRender && handleNext()
        !taxTokenRender && setError('Tax token is required')

    }



    return (
        <div className="h-[300px] ">
            <h1 className='mt-3 mb-7 text-sm'>Upload a clear image of the vehicle tax token.</h1>
            <div className='relative'>
                <input
                    id="taxToken"
                    className="VideoInput_input hidden"
                    type="file"
                    accept="image/*"
                    onChange={handleCarTaxToken}
                />
                <div>


                    {!taxTokenRender ?

                        <div className="flex justify-center  items-center  px-6 pt-5 pb-6 mb-20">
                            <div className="space-y-1 text-center">
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="taxToken" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
                                        <AssignmentOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1.3, scale: "4" }} ></AssignmentOutlinedIcon>
                                        <p className=' cursor-pointer mt-10 border rounded border-primary hover:bg-primary text-primary hover:text-white text-xs px-2 py-1' >Upload document</p>
                                    </label>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="flex justify-center  items-center pb-5 ">
                            <ImageListItem
                                sx={{
                                    width: 220,
                                    height: 160,
                                }}
                            >
                                <img
                                    src={taxTokenRender}
                                    loading="lazy"
                                    alt='fitness'
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
                                            onClick={() => setTaxTokenRender(sessionStorage.removeItem('taxToken'))}
                                            sx={{ color: 'white' }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    }
                                    actionPosition="left"
                                />
                            </ImageListItem>
                        </div>
                    }

                </div>
                {error && <p className='text-sm text-[brown] pl-[20%]'>{error}</p>}
                <div className='relative flex justify-between mt-5 pb-10'>
                    <Button
                        size='small'
                        onClick={handleBack}
                        sx={{ mt: 1 }}
                    >
                        <span>
                            <ArrowBackIcon style={{ height: '17px' }}></ArrowBackIcon>  <span className=''>back</span>
                        </span>
                    </Button>
                    <Button
                        variant="contained"
                        size='small'
                        onClick={() => { submitCarTaxToken() }}
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


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const CarOwnerAddCar = () => {

    const [openAddCar, setOpenAddCar] = React.useState(false);


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
            label: 'Upload Vehicle Images',
            description: <UploadCarImages handleNext={handleNext} handleBack={handleBack}></UploadCarImages>
        },
        {
            label: 'Vehicle registration paper',
            description: <RegistrationPaper handleNext={handleNext} handleBack={handleBack}></RegistrationPaper>

        },
        {
            label: 'Vehicle fitness paper',
            description: <FitnessPaper handleNext={handleNext} handleBack={handleBack}></FitnessPaper>

        },
        {
            label: 'Vehicle tax token',
            description: <TaxToken handleNext={handleNext} handleBack={handleBack}></TaxToken>

        },
    ]



    return (
        <Box>
            <Box className=''>
                <Button onClick={() => { setOpenAddCar(true); sessionStorage.clear() }} variant='contained'><AddIcon></AddIcon>  <span> Add Vehicle</span></Button>
            </Box>

            <Dialog
                className='bg-primary'
                transitionDuration={1}
                open={openAddCar}
                onClose={() => setOpenAddCar(false)}
                onOpen={() => setOpenAddCar(true)}
                fullScreen
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >

                <Box className=' w-[100%] mx-auto mb-10 flex justify-center  flex-col relative w-[100vw] md:w-[400px]'>
                    <Box className='flex items-center mb-7 py-1  bg-primary text-white '>
                        <IconButton className='w-10 h-10' style={{ color: 'white' }} onClick={() => setOpenAddCar(false)} aria-label="back">
                            <ArrowBackIcon />
                        </IconButton>
                        <h1 className='md:text-lg mx-auto text-md pr-5 '>Add Vehicle </h1>
                    </Box>
                    <Box className='w-[95%] pl-5  mx-auto'>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel >
                                        <span style={{ fontWeight: 'bold' }} className='text-primary'>{step.label}</span>
                                    </StepLabel>
                                    <StepContent>
                                        <Typography>{step.description}</Typography>
                                        {/* <Box sx={{ mb: 2 }}>
                                            <div>
                                                {index > 1 &&
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
                                        </Box> */}
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Box className='space-y-5 mt-5 pl-7' >

                                <p className='text-[green] bg-[green] bg-opacity-20 w-[80%] text-center px-2 py-1 rounded-md' >
                                    Vehicle Added successfully! </p>
                                <p className='text-sm my-3' >
                                    Now this vehicle is ready to go! </p>

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
                                        onClick={() => { setOpenAddCar(false); sessionStorage.clear() }}
                                        sx={{ mt: 4 }}
                                    >
                                        <span>
                                            <span className=''>Vehicles List</span> <ArrowForwardIcon style={{ height: '17px' }}></ArrowForwardIcon>
                                        </span>
                                    </Button>
                                </div>

                            </Box>
                        )}
                    </Box>

                </Box>
            </Dialog>

        </Box>
    )
}

export default CarOwnerAddCar