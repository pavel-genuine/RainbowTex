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
import useDrawerOpen from '../../hooks/useDrawerOpen';
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


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

const autocompleteService = { current: null };

const FindCars = ({ open, setOpen }) => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [time, setTime] = React.useState();
    const [pickUp, setPickUp] = React.useState();
    const [destination, setDestination] = React.useState();
    const [openSearch, setOpenSearch] = React.useState(false);
    const [openMap, setOpenMap] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDialogParam, setOpenDialogParam] = React.useState('');

    const [valueOrigin, setValueOrigin] = React.useState(null);
    const [valueDestination, setValueDestination] = React.useState(null);
    const [inputValueOrigin, setInputValueOrigin] = React.useState('');
    const [inputValueDestination, setInputValueDestination] = React.useState('');
    const [optionsOrigin, setOptionsOrigin] = React.useState([]);
    const [optionsDestination, setOptionsDestination] = React.useState([]);
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
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current =
                new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValueOrigin === '') {
            setOptionsOrigin(valueOrigin ? [valueOrigin] : []);
            return undefined;
        }


        fetch({ input: inputValueOrigin }, (results) => {
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


        return () => {
            active = false;
        };
    }, [valueOrigin, inputValueOrigin, fetch]);



    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current =
                new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }


        if (inputValueDestination === '') {
            setOptionsDestination(valueDestination ? [valueDestination] : []);
            return undefined;
        }


        fetch({ input: inputValueDestination }, (results) => {
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

        return () => {
            active = false;
        };
    }, [valueDestination, inputValueDestination, fetch]);


    const onSubmit = async (data) => {
        setOpenSearch(true)
    }


    const handleClickOpen = (param) => {
        setOpenDialogParam(() => param)
        setOpenDialog(true)

    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const StyledBox = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
    }));



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

    function handleEnter(event) {
        console.log(event.key)
        if (event.key === "Enter") {

            // event.key = "Tab"
            // console.log('tab');
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            console.log(index)
            form[index + 2].focus();
            event.preventDefault();
        }
    }


    const pickUpPoint =
        <div className="relative form-control rounded   flex boder justify-center items-center">

            <Autocomplete
                onKeyDown={(e) => handleEnter(e)}

                className='w-[90vw] md:w-[350px]'
                freeSolo
                id="google-map-demo"
                getOptionLabel={(option) =>
                    typeof option === 'string' ? option : option.description
                }
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
                    <TextField {...params} label="Pick-up Point" fullWidth />
                )}
                renderOption={(props, option) => {
                    const matches = option.structured_formatting.main_text_matched_substrings;
                    const parts = parse(
                        option.structured_formatting.main_text,
                        matches.map((match) => [match.offset, match.offset + match.length]),
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
                                    {parts.map((part, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                fontWeight: part.highlight ? 700 : 400,
                                            }}
                                        >
                                            {part.text}
                                        </span>
                                    ))}

                                    <Typography variant="body2" color="text.secondary">
                                        {option.structured_formatting.secondary_text}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </li>
                    );
                }}
            />
            {
                !valueOrigin &&
                <span onClick={() => setOpenMap(true)} className='absolute top-[15%] right-[25%] cursor-pointer bg-[#52f15217] rounded-full flex flex-col justify-center items-center py-1 px-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span className='text-[11px] text-primary'>
                        GPS
                    </span>
                </span>
            }

            {!valueOrigin &&
                <span onClick={() => setOpenMap(true)} className='absolute top-[15%] right-[10%] cursor-pointer bg-[#52f15217] rounded-full flex flex-col justify-center items-center py-1 px-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                    <span className='text-[11px] text-primary'>
                        map
                    </span>
                </span>
            }
        </div>

    // console.log(value,'valll');

    const destinationPoint =
        <div className="relative form-control  rounded flex boder justify-center items-center ">
            <Autocomplete
                onKeyDown={(e) => handleEnter(e)}

                className='w-[90vw] md:w-[350px]'
                freeSolo
                id="google-map-demo"
                getOptionLabel={(option) =>
                    typeof option === 'string' ? option : option.description
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
                        label="Destination" fullWidth />
                )}
                renderOption={(props, option) => {
                    const matches = option.structured_formatting.main_text_matched_substrings;
                    const parts = parse(
                        option.structured_formatting.main_text,
                        matches.map((match) => [match.offset, match.offset + match.length]),
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
                                    {parts.map((part, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                fontWeight: part.highlight ? 700 : 400,
                                            }}
                                        >
                                            {part.text}
                                        </span>
                                    ))}

                                    <Typography variant="body2" color="text.secondary">
                                        {option.structured_formatting.secondary_text}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </li>
                    );
                }}
            />
            {
                !valueDestination &&
                <span onClick={() => setOpenMap(true)} className='absolute top-[15%] right-[10%] cursor-pointer bg-[#52f15217] rounded-full flex flex-col justify-center items-center py-1 px-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                    <span className='text-[11px] text-primary'>
                        map
                    </span>
                </span>
            }
        </div>



    return (
        <div style={{ backgroundImage: `url(${'https://new-media.dhakatribune.com/en/uploads/2021/10/26/zakir-hossain.jpeg'})`, backgroundSize: 'cover' }}
            className='h-[65vh] md:h-[100vh]'>
            <div className=' md:pt-28 md:pl-40 bg-black bg-opacity-50 h-[65vh] md:h-[100vh] w-[100%]'>
                <div className='bg-white md:bg-transparent p-2 pt-20 md:pt-0 h-[65vh]'>
                    <Box className='md:bg-white md:bg-gradient-to-r md:from-white md:to-white  backdrop-filter-none backdrop-blur-sm shadow rounded-xl md:w-[500px] md:pt-0 md:h-[450px] pb-5 md:pb-0 '>

                        <form className="flex  justify-center items-center flex-col relative " onSubmit={handleSubmit(onSubmit)}>


                            <div className='flex md:mt-16 mt-5  justify-center items-center flex-col space-y-8 w-[100%] '>

                                <div className="relative form-control rounded   flex boder justify-center items-center">

                                    <Autocomplete
                                        onKeyDown={(e) => handleEnter(e)}

                                        className='w-[90vw] md:w-[350px]'
                                        freeSolo
                                        id="google-map-demo"
                                        getOptionLabel={(option) =>
                                            typeof option === 'string' ? option : option.description
                                        }
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
                                            <TextField {...params} label="Pick-up Point" fullWidth />
                                        )}
                                        renderOption={(props, option) => {
                                            const matches = option.structured_formatting.main_text_matched_substrings;
                                            const parts = parse(
                                                option.structured_formatting.main_text,
                                                matches.map((match) => [match.offset, match.offset + match.length]),
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
                                                            {parts.map((part, index) => (
                                                                <span
                                                                    key={index}
                                                                    style={{
                                                                        fontWeight: part.highlight ? 700 : 400,
                                                                    }}
                                                                >
                                                                    {part.text}
                                                                </span>
                                                            ))}

                                                            <Typography variant="body2" color="text.secondary">
                                                                {option.structured_formatting.secondary_text}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </li>
                                            );
                                        }}
                                    />
                                    {
                                        !valueOrigin &&
                                        <span onClick={() => setOpenMap(true)} className='absolute top-[15%] right-[25%] cursor-pointer bg-[#52f15217] rounded-full flex flex-col justify-center items-center py-1 px-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                            </svg>
                                            <span className='text-[11px] text-primary'>
                                                GPS
                                            </span>
                                        </span>
                                    }

                                    {!valueOrigin &&
                                        <span onClick={() => setOpenMap(true)} className='absolute top-[15%] right-[10%] cursor-pointer bg-[#52f15217] rounded-full flex flex-col justify-center items-center py-1 px-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                                            </svg>
                                            <span className='text-[11px] text-primary'>
                                                map
                                            </span>
                                        </span>
                                    }
                                </div>
                                <ThemeProvider theme={darkTheme}>
                                    <Dialog
                                        className=' bg-primary min-h-[1000px] '
                                        fullScreen
                                        open={openMap}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={() => setOpenMap(false)}
                                        aria-describedby="alert-dialog-slide-description"
                                    >
                                        <div className=' bg-primary'>

                                            <div className=' md:flex items-center w-[100vw] md:my-7 mb-4 md:mb-7'>
                                                <button onClick={() => setOpenMap(false)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-white w-6 h-6 ml-2 mt-2   ">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                                    </svg>
                                                </button>

                                                <div className='space-y-1 md:space-x-5 md:space-y-0 md:flex justify-center items-center  md:w-[50%] mx-auto '>
                                                    {pickUpPoint}
                                                    <p className='block md:hidden w-[5%] mx-auto'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5  text-white">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                                                        </svg>

                                                    </p>
                                                    <span className='md:inline hidden'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </span>

                                                    {destinationPoint}
                                                </div>

                                            </div>


                                            <GoRentalMap origin={valueOrigin?.description} destination={valueDestination?.description}>

                                            </GoRentalMap>
                                        </div>
                                    </Dialog>
                                </ThemeProvider>
                                <div className="relative form-control  rounded flex boder justify-center items-center ">
                                    <Autocomplete
                                        onKeyDown={(e) => handleEnter(e)}

                                        className='w-[90vw] md:w-[350px]'
                                        freeSolo
                                        id="google-map-demo"
                                        getOptionLabel={(option) =>
                                            typeof option === 'string' ? option : option.description
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
                                                label="Destination" fullWidth />
                                        )}
                                        renderOption={(props, option) => {
                                            const matches = option.structured_formatting.main_text_matched_substrings;
                                            const parts = parse(
                                                option.structured_formatting.main_text,
                                                matches.map((match) => [match.offset, match.offset + match.length]),
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
                                                            {parts.map((part, index) => (
                                                                <span
                                                                    key={index}
                                                                    style={{
                                                                        fontWeight: part.highlight ? 700 : 400,
                                                                    }}
                                                                >
                                                                    {part.text}
                                                                </span>
                                                            ))}

                                                            <Typography variant="body2" color="text.secondary">
                                                                {option.structured_formatting.secondary_text}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </li>
                                            );
                                        }}
                                    />
                                    {
                                        !valueDestination &&
                                        <span onClick={() => setOpenMap(true)} className='absolute top-[15%] right-[10%] cursor-pointer bg-[#52f15217] rounded-full flex flex-col justify-center items-center py-1 px-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                                            </svg>
                                            <span className='text-[11px] text-primary'>
                                                map
                                            </span>
                                        </span>
                                    }
                                </div>

                            </div>

                            <div className='mt-8 mb-5 relative form-control  rounded flex boder justify-center items-center '>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        onKeyDown={(e) => handleEnter(e)}

                                        components={{
                                            OpenPickerIcon: AccessTimeIcon,
                                        }}
                                        className='w-[90vw] md:w-[350px] z-10'
                                        label="Schedule The Trip"
                                        value={time}
                                        onChange={(newValue) => {
                                            // console.log(newValue.$d,'newtttt');
                                            setTime(newValue?.$d);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>

                                <span className='absolute top-[15%] right-[10%] z-0'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 text-primary bg-[#52f15217] md:hidden rounded-full p-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>

                            </div>

                            <Button className='w-[90vw] md:w-[350px] h-[50px]' type='submit' variant="contained"> <span >Find Cars</span> </Button>
                        </form>
                    </Box>
                </div>
            </div>

        </div>

    )
}

export default FindCars