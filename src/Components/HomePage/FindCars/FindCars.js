import { Autocomplete, Box, Button, CircularProgress, createFilterOptions, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Slide, styled, SwipeableDrawer, TextField, ThemeProvider, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import './FindCars.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { type } from '@testing-library/user-event/dist/type';
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { grey } from '@mui/material/colors';
import CarResult from '../CarResult/CarResult';
import GoRentalMap from '../../GoogleMap/GoRentalMap';
import { useEffect } from 'react';
import parse from 'autosuggest-highlight/parse';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import throttle from 'lodash.throttle';
import { GoogleMap } from '@react-google-maps/api';
import { map } from '@firebase/util';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { ArrowIcon } from '../../Profile/CarOwner/CarOwnerAddCar';
import AllCarResults from '../CarResult/AllCarResults';
import EastIcon from '@mui/icons-material/East';
import { getRefreshToken } from '../../../api/api';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


export const darkTheme = createTheme({
    typography: {
        fontFamily: 'Artifika',

        button: {
            textTransform: 'none'
        }
    },

    palette: {
        mode: 'dark',
        primary: {
            main: "#ffffff",

            mainGradient: "linear-gradient(to right , #480626, #7e2651)",
        },
        text: {
            main: "#ffffff",
        }

    },
});


export const pickUpPoint = (optionsOrigin, valueOrigin, setOptionsOrigin, setValueOrigin, setInputValueOrigin, setOpenMap, openMap, variant = "outlined", placeholder = "", label = "Pick-up Point") =>
    <div className="relative form-control rounded   flex boder justify-center items-center">

        <Autocomplete
            className={`w-[90vw] md:w-[350px]`}
            freeSolo
            id="google-map-demo"
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
            }
            disablePortal
            filterOptions={(x) => x}
            options={optionsOrigin}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={valueOrigin}
            onChange={(event, newValue) => {
                setOptionsOrigin(newValue ? [newValue, ...optionsOrigin] : optionsOrigin);
                setValueOrigin(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValueOrigin(newInputValue);
            }}

            renderInput={(params) => (
                <TextField {...params}
                    style={{ border: 'solid 1px', borderColor: '#e1e1e1' }}
                    className='rounded-md outline-none '
                    autoFocus
                    sx={{ border: 'none', "& fieldset": { border: 'none' }, }}
                    placeholder="Pick-up Point" fullWidth />
            )}
            renderOption={(props, option) => {
                const matches = option?.structured_formatting?.main_text_matched_substrings;
                const parts = matches?.length > 0 && parse(
                    option?.structured_formatting?.main_text,
                    matches?.map((match) => [match?.offset, match?.offset + match?.length]),
                );


                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Box
                                    component={LocationOnIcon}
                                    sx={{ color: 'text.secondary', mr: 2 }}
                                />
                            </Grid>
                            <Grid item xs>
                                {parts.length > 0 && parts?.map((part, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            fontWeight: part?.highlight ? 700 : 400,
                                        }}
                                    >
                                        {part?.text}
                                    </span>
                                ))}

                                <Typography variant="body2" color="text.secondary">
                                    {option?.structured_formatting?.secondary_text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
          
    </div>

export const destinationPoint = (optionsDestination, valueDestination, setOptionsDestination, setValueDestination, setInputValueDestination, setOpenMap, openMap) =>
    <div className="relative form-control  rounded flex boder justify-center items-center ">
        <Autocomplete
            className={`w-[90vw] md:w-[350px]`}
            freeSolo
            disablePortal
            id="google-map-demo"
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option?.description
            }
            filterOptions={(x) => x}
            options={optionsDestination}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={valueDestination}
            onChange={(event, newValue) => {
                setOptionsDestination(newValue ? [newValue, ...optionsDestination] : optionsDestination);
                setValueDestination(newValue);

            }}
            onInputChange={(event, newInputValue) => {
                setInputValueDestination(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params}
                    style={{ border: 'solid 1px', borderColor: '#e1e1e1' }}
                    className='rounded-md outline-none '
                    autoFocus
                    sx={{ border: 'none', "& fieldset": { border: 'none' }, }}
                    placeholder="Destination" fullWidth
                />
            )}
            renderOption={(props, option) => {
                const matches = option?.structured_formatting?.main_text_matched_substrings;

                const parts = parse(
                    option?.structured_formatting?.main_text,
                    matches?.map((match) => [match?.offset, match?.offset + match?.length]),
                );


                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Box
                                    component={LocationOnIcon}
                                    sx={{ color: 'text.secondary', mr: 2 }}
                                />
                            </Grid>
                            <Grid item xs>
                                {parts?.map((part, index) => {
                                    // console.log(part?.text,'part text');
                                    return (
                                        <span
                                            key={index}
                                            style={{
                                                fontWeight: part?.highlight ? 700 : 400,
                                            }}
                                        >
                                            {part.text}
                                        </span>
                                    )
                                }
                                )
                                }

                                <Typography variant="body2" color="text.secondary">
                                    {option?.structured_formatting?.secondary_text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    </div>

export const schedule = (setTime, time) =>
    <div className='relative form-control  rounded flex boder justify-center items-center '>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                sx={{ border: 'none', "& fieldset": { border: 'none' }, }}
                style={{ zIndex: 2100 }}
                disablePortal
                components={{
                    OpenPickerIcon: AccessTimeIcon,
                }}
                className={`w-[90vw] md:w-[350px] z-10 rounded-md outline-none `}

                // label="When To Trip"
                value={time}
                onChange={(newValue) => {
                    // console.log(newValue.$d,'newtttt');
                    setTime(newValue?.$d);
                }}
                renderInput={(params) =>
                    <TextField {...params}
                        style={{ border: 'solid 1px', borderColor: '#e1e1e1' }}
                        sx={{ border: 'none', "& fieldset": { border: 'none' }, }}

                    />}
            />
        </LocalizationProvider>

        <span className='absolute top-[15%] right-[10%] z-0'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.8} stroke="currentColor" className="w-8 h-8 text-[ash] rounded-full md:hidden p-1 mt-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </span>

    </div>


function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position?.appendChild(script);
}

export const GOOGLE_MAPS_API_KEY = 'AIzaSyA7Hbtoc7jXPbTNZwdGRzkpt21M3l5YWwE';


const FindCars = ({ open, setOpen }) => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [time, setTime] = React.useState(new Date());
    const [tripData, setTripData] = React.useState({});
    const [showdestination, setShowDestination] = React.useState(false);
    const [openSearch, setOpenSearch] = React.useState(false);
    const [openMap, setOpenMap] = React.useState(false);
    const [valueOrigin, setValueOrigin] = React.useState(null);
    const [coordinatesPickup, setCoordinatesPickup] = React.useState('');
    const [valueDestination, setValueDestination] = React.useState(null);
    const [coordinatesDestination, setCoordinatesDestination] = React.useState('');
    const [inputValueOrigin, setInputValueOrigin] = React.useState('');
    const [inputValueDestination, setInputValueDestination] = React.useState('');
    const [optionsOrigin, setOptionsOrigin] = React.useState([]);
    const [optionsDestination, setOptionsDestination] = React.useState([]);
    const [mapData, setMapData] = React.useState({});
    const [gps, setGps] = React.useState();
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [autoFocus, setAutoFocus] = useState(false)
    const loaded = React.useRef(false);


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

                if (window?.google) {
                    new window.google.maps.places.AutocompleteService().getPlacePredictions(request, callback);

                }
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
               
                        const lat =results[0].geometry.location.lat()
                        const lng =results[0].geometry.location.lng()

                        // setCoordinatesPickup({lat,lng})
                    }
                });
            }


        }

        // initializeGeoCodeOrigin()

        navigator.geolocation.getCurrentPosition(function () { }, function () { }, {});

        (valueOrigin || gps) && setAutoFocus(() => true)


    }, [valueOrigin, inputValueOrigin, fetch, gps]);



    navigator.geolocation.getCurrentPosition(

        function (position) {

            // console.log("Latitude is :", position.coords.latitude);
            // console.log("Longitude is :", position.coords.longitude);

            const lat =position.coords.latitude
            const lng =position.coords.longitude

            // setCoordinatesPickup({lat,lng})

            function displayLocation(latitude, longitude) {
                if (window?.google) {

                    const geocoder = new window.google.maps.Geocoder();
                    const latlng = new window.google.maps.LatLng(latitude, longitude);


                    geocoder.geocode(
                        { 'latLng': latlng },

                        (results, status) => {
                            if (status == window.google.maps.GeocoderStatus.OK) {
                                if (results[3]) {
                                    const add = results[0].formatted_address;
                                    const value = add.split(",");
                                    const count = value?.length;
                                    const country = value[count - 1];
                                    const state = value[count - 2];
                                    const city = value[count - 3];

                                    // console.log(results[3], 'add');

                                    if (!valueOrigin) {
                                        setValueOrigin(() => add);
                                        setGps(() => add)
                                    }

                                }
                                else if (results[0]) {
                                    const add = results[0].formatted_address;
                                    const value = add.split(",");
                                    const count = value?.length;
                                    const country = value[count - 1];
                                    const state = value[count - 2];
                                    const city = value[count - 3];

                                    if (!valueOrigin) {
                                        setValueOrigin(() => add);
                                        setGps(() => add)
                                    }
                                }
                            }
                        }
                    );
                }
            }

            displayLocation(position.coords.latitude, position.coords.longitude)
        },
        function (e) {
            // console.log(e, 'error');
        },
        { maximumAge: 60000, timeout: 2000 }
    );


    React.useEffect(() => {
        let active = true;

        if (inputValueDestination === '') {
            setOptionsDestination(valueDestination ? [valueDestination] : []);
            return undefined;
        }


        fetch({ input: inputValueDestination, componentRestrictions: { country: 'bd' } }, (results) => {
            if (active) {
                let newOptions = [];

                if (valueDestination) {
                    newOptions = [valueDestination];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptionsDestination(newOptions);
            }
        });


        function initializeGeoCodeDestination() {
            if (window.google) {

                const geocoder = new window.google.maps.Geocoder();

                geocoder.geocode({
                    address: valueDestination?.description
                }, (results, status) => {
                    if (status == window.google.maps.GeocoderStatus.OK) {
                        const lat =results[0].geometry.location.lat()
                        const lng =results[0].geometry.location.lng()

                        // setCoordinatesDestination({lat,lng})
                    }
                });
            }


        }

       

        // initializeGeoCodeDestination()

        
        return () => {
            active = false;
        };
    }, [valueDestination, inputValueDestination, fetch]);



    const navigate = useNavigate()

    useEffect(() => {


        window.history.pushState({}, '', '/');
        window.history.pushState({}, '', '/');

        window.addEventListener("popstate", () => {
            navigate('/')
        });


        async function calculateRoute() {
            // if ((props?.gps===''&& props?.origin === '') || props?.destination === '') {
            //   return
            // }
            
            // eslint-disable-next-line no-undef
            const directionsService = new google.maps.DirectionsService()
            const results = await directionsService.route({
                origin: valueOrigin?.description ? valueOrigin?.description : gps,
                destination: valueDestination?.description,
                // eslint-disable-next-line no-undef
                travelMode: google.maps.TravelMode.DRIVING,
            })
            setDirectionsResponse(results)
            const distance = results.routes[0].legs[0].distance.text.split(" ");
            setDistance(Number(distance[0]))
            setDuration(results.routes[0].legs[0].duration.text)
            setMapData({ distance, duration })

        }
        // calculateRoute()

        //   console.log(distance,duration,'dddd');

        setTripData(
            {
                startLocation: valueOrigin?.description ? valueOrigin?.description : gps,
                destination: valueDestination?.description,
                distance: distance,
                duration: duration,
                schedule: time?.toString()?.slice(0, 21),
                gps: gps,
                setMapData: setMapData,
         
               
            }
        )
    }, [valueOrigin,valueDestination,mapData,time,gps,navigate,distance,duration])



    const onSubmit = async (data) => {

        // setTripData([
        //     {
        //         startLocation: valueOrigin?.description ? valueOrigin?.description : gps,
        //         destination: valueDestination?.description,
        //         distance: mapData?.distance,
        //         schedule: time?.toString()?.slice(0, 21),
        //         gps: gps,
        //         setMapData: setMapData
        //     }
        // ])

        valueOrigin && valueDestination && setOpenSearch(true)

    }

    // const renderInput = (params) => {
    //     return (
    //         <TextField
    //             {...params}
    //             label="Select an option"
    //             variant="outlined"
    //             InputProps={{
    //                 ...params.InputProps,
    //                 startAdornment: (
    //                     ''
    //                 ),
    //             }}
    //         />
    //     );
    // };





    const myDefaultOption = {
        structured_formatting: {
            main_text_matched_substrings: 'map'
        }
    }
    const _filterOptions = createFilterOptions();
    const filterOptions = (options, state) => {
        const results = _filterOptions(options, state);

        if (!results.includes(myDefaultOption)) {
            results.unshift(myDefaultOption);
        }

        return results;
    };

    return (
        <div style={{ backgroundImage: `url(${'https://new-media.dhakatribune.com/en/uploads/2021/10/26/zakir-hossain.jpeg'})`, backgroundSize: 'cover' }}
            className='h-[65vh] md:h-[100vh]'>
            <div className=' md:pt-28 md:pl-40 bg-black bg-opacity-50 h-[65vh] md:h-[100vh] w-[100%]'>
                <div className='bg-white md:bg-transparent p-2 pt-16 md:pt-0 h-[65vh]'>
                    <Box className='md:bg-white relative md:bg-gradient-to-r md:from-white md:to-white  backdrop-filter-none backdrop-blur-sm shadow rounded-xl md:w-[500px] md:pt-0 md:h-[450px] pb-5 md:pb-0 mb-5'>
                        <div className='flex items-center absolute top-0 right-0 space-x-6 m-4 md:m-0 md:mt-10 md:mr-20'>
                            {
                                <span onClick={() => setOpenMap(true)} className=' z-20 cursor-pointer bg-[#e1dfe0] rounded-full flex flex-col justify-center items-center py-1 px-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                                    </svg>
                                    <span className='text-[11px] text-primary'>
                                        map
                                    </span>
                                </span>

                            }

                            {

                                // <span onClick={() => setOpenMap(true)} className=' z-20 cursor-pointer bg-[#e1dfe0] rounded-full flex flex-col justify-center items-center py-1 px-2'>
                                //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary ">
                                //         <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                //         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                //     </svg>
                                //     <span className='text-[11px] text-primary'>
                                //         GPS
                                //     </span>
                                // </span>
                            }
                        </div>
                        <form className="flex  justify-center items-center flex-col relative pt-14 md:pt-8" onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex md:mt-16 mt-5  justify-center items-center flex-col space-y-8 w-[100%] '>

                                {pickUpPoint(optionsOrigin, valueOrigin, setOptionsOrigin, setValueOrigin, setInputValueOrigin, setOpenMap, openMap)}


                                <Dialog
                                    // style={openSearch? { zIndex: 16100 }:{ zIndex: 15100 }}
                                    className=' bg-primary min-h-[1000px] relative '
                                    fullScreen
                                    open={openMap}
                                    transitionDuration={1}
                                    // TransitionComponent={Transition}
                                    // keepMounted
                                    onClose={() => setOpenMap(false)}
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <ThemeProvider theme={darkTheme}>
                                        <div className='fixed z-20 w-[100vw]'>
                                            <div className='bg-primary md:pt-4 md:mb-7 md:pb-5'>
                                                <div className=' md:flex items-center '>
                                                    <Box className='md:block hidden'>
                                                        <span onClick={() => setOpenMap(false)}>
                                                            <ArrowIcon></ArrowIcon>
                                                        </span>
                                                    </Box>
                                                    {/* {!showdestination ? <KeyboardDoubleArrowDownIcon onClick={() => setShowDestination(() => true)} className='md:hidden md:text-primary absolute top-12 right-0 text-white mr-1'></KeyboardDoubleArrowDownIcon>
                                                        : <KeyboardDoubleArrowUpIcon onClick={() => setShowDestination(() => false)} className='md:hidden md:text-primary absolute top-12 right-0 text-white mr-1'></KeyboardDoubleArrowUpIcon>} */}

                                                    <div className='md:space-x-5 md:space-y-0 w-[100vw]  md:w-[50%] mx-auto tems-center justify-center '>


                                                        <div onFocus={() => setShowDestination(() => true)} className='md:hidden flex items-center  h-[90px]  py-[15px]'>
                                                            <Box>
                                                                <span onClick={() => { setOpenMap(false) }}>
                                                                    <ArrowIcon></ArrowIcon>
                                                                </span>
                                                            </Box>
                                                            <div className='w-[80%] px-1'>
                                                                {
                                                                    pickUpPoint(optionsOrigin, valueOrigin, setOptionsOrigin, setValueOrigin, setInputValueOrigin, setOpenMap, openMap)
                                                                }
                                                            </div>
                                                            <div>
                                                                {!showdestination ? <KeyboardDoubleArrowDownIcon onClick={() => setShowDestination(() => true)} className='md:hidden md:text-primary  text-white pr-1'></KeyboardDoubleArrowDownIcon>
                                                                    : <KeyboardDoubleArrowUpIcon onClick={() => setShowDestination(() => false)} className='md:hidden md:text-primary  text-white pr-1 '></KeyboardDoubleArrowUpIcon>}

                                                            </div>
                                                        </div>


                                                        <div className={`${showdestination ? '' : 'hidden md:block'} md:flex md:space-x-4 items-center justify-center pt-2`}>
                                                            <div className='lg:w-[30%] md:w-[40%] hidden md:block'>
                                                                {
                                                                    pickUpPoint(optionsOrigin, valueOrigin, setOptionsOrigin, setValueOrigin, setInputValueOrigin)
                                                                }
                                                            </div>
                                                            <span className='md:inline hidden'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                                                </svg>

                                                            </span>


                                                            {
                                                                showdestination &&
                                                                <p className={`block md:hidden w-[5%] mx-auto absolute top-[30%] right-[50%]`}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                                                                    </svg>


                                                                </p>

                                                            }
                                                            <div className='lg:w-[30%] md:w-[40%] w-[80%] mx-auto pl-1 pb-[15px] md:pb-0'>
                                                                {
                                                                    destinationPoint(optionsDestination, valueDestination, setOptionsDestination, setValueDestination, setInputValueDestination, autoFocus)
                                                                }
                                                            </div>
                                                            <div className='lg:w-[30%] md:w-[40%] w-[80%] mx-auto pl-1 pb-[15px] md:pb-0'>
                                                                {schedule(setTime, time)}
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                                {mapData?.distance &&
                                                    <p className='text-sm text-white text-center md:mt-2 pb-2 md:pb-0 mt-[-2%]'>
                                                        {distance} / {duration}

                                                    </p>
                                                }

                                            </div>
                                        </div>

                                    </ThemeProvider>


                                    <div className={` ${showdestination ? ' pt-[0%]' : 'pt-[0%]'}  md:pt-[5%] `}>

                                        <GoRentalMap setMapData={setMapData} gps={gps} origin={valueOrigin?.description} destination={valueDestination?.description}>

                                        </GoRentalMap>
                                        <div className='flex justify-center items-center'>
                                            {
                                                !openSearch ?
                                                    <button className=' rounded-md w-[200px] bg-primary h-[40px] text-white absolute top-[80vh]' onClick={() => { valueOrigin && valueDestination && setOpenSearch(true) }}>  Find Cars</button>
                                                    :
                                                    <button className=' rounded-md w-[200px] bg-primary h-[40px] text-white absolute top-[80vh]' onClick={() => setOpenMap(false)}>Find Cars</button>

                                            }
                                        </div>
                                    </div>

                                </Dialog>

                                {destinationPoint(optionsDestination, valueDestination, setOptionsDestination, setValueDestination, setInputValueDestination, autoFocus)}

                                {schedule(setTime, time)}

                                <Button className='w-[90vw] md:w-[350px] h-[50px]' type='submit' variant="contained">
                                    <span >Find Cars</span> </Button>

                            </div>


                        </form>

                    </Box>
                </div>
            </div>


            <Dialog
                className='bg-primary'
                transitionDuration={1}
                open={openSearch}
                onClose={() => setOpenSearch(false)}
                onOpen={() => setOpenSearch(true)}
                fullScreen
                aria-describedby="alert-dialog-slide-description"
            >
                <ThemeProvider theme={darkTheme}>
                    <div className='fixed z-20 w-[100vw]'>
                        <div className='bg-primary md:pt-4 md:mb-7 md:pb-5'>
                            <div className=' md:flex items-center '>
                                <Box className='md:block hidden'>
                                    <span onClick={() => setOpenSearch(false)}>
                                        <ArrowIcon></ArrowIcon>
                                    </span>
                                </Box>
                                {/* {!showdestination ? <KeyboardDoubleArrowDownIcon onClick={() => setShowDestination(() => true)} className='md:hidden md:text-primary absolute top-12 right-0 text-white mr-1'></KeyboardDoubleArrowDownIcon>
                                                        : <KeyboardDoubleArrowUpIcon onClick={() => setShowDestination(() => false)} className='md:hidden md:text-primary absolute top-12 right-0 text-white mr-1'></KeyboardDoubleArrowUpIcon>} */}

                                <div className='md:space-x-5 md:space-y-0 w-[100vw]  md:w-[50%] mx-auto tems-center justify-center '>


                                    <div onFocus={() => setShowDestination(() => true)} className='md:hidden flex items-center  h-[90px]  py-[15px]'>
                                        <Box>
                                            <span onClick={() => { setOpenSearch(false) }}>
                                                <ArrowIcon></ArrowIcon>
                                            </span>
                                        </Box>
                                        <div className='w-[80%] px-1'>
                                            {
                                                pickUpPoint(optionsOrigin, valueOrigin, setOptionsOrigin, setValueOrigin, setInputValueOrigin)
                                            }
                                        </div>
                                        <div>
                                            {!showdestination ? <KeyboardDoubleArrowDownIcon onClick={() => setShowDestination(() => true)} className='md:hidden md:text-primary  text-white pr-1'></KeyboardDoubleArrowDownIcon>
                                                : <KeyboardDoubleArrowUpIcon onClick={() => setShowDestination(() => false)} className='md:hidden md:text-primary  text-white pr-1 '></KeyboardDoubleArrowUpIcon>}

                                        </div>
                                    </div>


                                    <div className={`${showdestination ? '' : 'hidden md:block'} md:flex md:space-x-4 items-center justify-center pt-2`}>
                                        <div className='lg:w-[30%] md:w-[40%] hidden md:block'>
                                            {
                                                pickUpPoint(optionsOrigin, valueOrigin, setOptionsOrigin, setValueOrigin, setInputValueOrigin)
                                            }
                                        </div>
                                        <span className='md:inline hidden'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                            </svg>

                                        </span>


                                        {
                                            showdestination &&
                                            <p className={`block md:hidden w-[5%] mx-auto absolute top-[30%] right-[50%]`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                                                </svg>


                                            </p>

                                        }
                                        <div className='lg:w-[30%] md:w-[40%] w-[80%] mx-auto pl-1 pb-[15px] md:pb-0'>
                                            {
                                                destinationPoint(optionsDestination, valueDestination, setOptionsDestination, setValueDestination, setInputValueDestination, setOpenMap, autoFocus)
                                            }
                                        </div>
                                        <div className='lg:w-[30%] md:w-[40%] w-[80%] mx-auto pl-1 pb-[15px] md:pb-0'>
                                            {schedule(setTime, time)}
                                        </div>

                                    </div>

                                </div>
                            </div>
                            {mapData?.distance &&
                                <p className='text-sm text-white text-center md:mt-2 pb-2 md:pb-0 mt-[-2%]'>
                                    {distance} / {duration}

                                </p>
                            }

                        </div>
                    </div>

                </ThemeProvider>

                <Box className={`${showdestination ? ' pt-[35%]' : 'pt-[35%]'} md:pt-[10%] pb-10`}>

                    <AllCarResults setTripData={setTripData} tripData={tripData} ></AllCarResults>

                </Box>
            </Dialog>

        </div>

    )
}

export default FindCars