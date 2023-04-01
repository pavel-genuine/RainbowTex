import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Alert, Button, createTheme, Snackbar, TextField, ThemeProvider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CarRentalIcon from '@mui/icons-material/CarRental';
import AirlineSeatLegroomExtraIcon from '@mui/icons-material/AirlineSeatLegroomExtra';
import { useForm } from 'react-hook-form';
import MuiPhoneNumber from 'material-ui-phone-number';
import {
    parsePhoneNumber,
    isValidPhoneNumber,
    getNumberType,
    validatePhoneNumberLength,
} from 'libphonenumber-js';
import parseMax from 'libphonenumber-js/max';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useReadOTP } from 'react-read-otp';
import { useLocation, useNavigate } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import auth from '../../firebase.init';
import { otpLogin } from '../../api/api';
import { CAR_OWNER, DRIVER, PASSENGER } from '../../constants/constants';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function AuthHome({ setOpen }) {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [tabValue, setTabValue] = React.useState(0);
    const [otpPassenger, setOtpPasssenger] = React.useState(0);
    const [otpPasssengerFinal, setOtpPasssengerFinal] = React.useState(0);
    const [otpPartner, setOtpPartner] = React.useState(0);
    const [otpPartnerFinal, setOtpPartnerFinal] = React.useState(0);
    const [phonePassenger, setPhonePassenger] = React.useState(0);
    const [phonePartner, setPhonePartner] = React.useState(0);
    const [loginPassenger, setLoginPassenger] = React.useState(false);
    const [loginPartner, setLoginPartner] = React.useState(false);
    const [enabledPassenger, setEnabledPassenger] = React.useState(false);
    const [enabledPartner, setEnabledPartner] = React.useState(false);
    const [seconds, setSeconds] = React.useState(65);
    const [error, setError] = React.useState('');
    const [toastOTP, setToastOTP] = React.useState(false);
    const [toastLogin, setToastLogin] = React.useState(false);
    // const [partnerRole, setPartnerRole] = React.useState(false);
    const [carOwnerRole, setCarOwnerRole] = React.useState(false);
    const [driverRole, setDriverRole] = React.useState(false);

    const navigate = useNavigate();

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                clearInterval(interval);

            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);


    const resend = () => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }



    useReadOTP(setOtpPasssenger, {
        enabledPassenger
    });

    useReadOTP(setOtpPartner, {
        enabledPartner
    });


    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };



    const captchaPassenger = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('passenger-sign', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                handleLoginPassenger()
                // ...
            },
        }, auth);
    }
    const captchaPartner = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('partner-sign', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                handleLoginPartner()
                // ...
            },
        }, auth);
    }

    const handleLoginPassenger = () => {
        phonePassenger && setEnabledPassenger(() => true)
        captchaPassenger()
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phonePassenger, appVerifier).then((confirmationResult) => {

            window.confirmationResult = confirmationResult;

            setTimeout(
                setToastOTP(() => true)
                , 1000)

        }).catch((error) => {
            console.log(error.message);
            setError('Unknown Error !')
        });
    };

    const handleLoginPartner = () => {
        phonePartner && setEnabledPartner(() => true)
        captchaPartner()
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phonePartner, appVerifier).then((confirmationResult) => {

            window.confirmationResult = confirmationResult;
            setTimeout(
                setToastOTP(() => true)
                , 1000)
        }).catch((error) => {
            // console.log(error);
            console.log(error?.message,'error message');
            setError('Unknown Error !')
        });
    };

    const handleCompleteOtpPassenger = (finalValue) => {
        // alert(finalValue);
        setOtpPasssengerFinal(finalValue)
    };
    const handleCompleteOtpPartner = (finalValue) => {
        // alert(finalValue);
        setOtpPartnerFinal(finalValue)
    };

    const fcmToken=localStorage.getItem('fcmToken')


    const onSubmitPassenger = async (datas) => {
        const code = otpPasssengerFinal;
        window.confirmationResult?.confirm(code).then(async (result) => {
            // User signed in successfully.
            const user = result?.user;
            const idToken = await user?.getIdToken()

            console.log(idToken,'idtoken passnger');

            const { data } = await otpLogin({ uid: user?.uid, contactNumber: phonePassenger,
                 idToken: idToken, otpProvider: 'firebase', userType: PASSENGER,firebaseDeviceToken:fcmToken })

            localStorage.setItem('role', 'user')
            localStorage.setItem('userId', data?.userId)

            setTimeout(
                setToastLogin(() => true)
                , 500)

            setTimeout(
               setOpen && setOpen(() => false)
                , 800)
            setTimeout(
                navigate('/profile')
                , 1000)

        }).catch((error) => {
            console.log(error, 'error');

            if (error?.message.includes('invalid')) {
                setError("OTP not matched")
            }
            if (error?.message.includes('expired')) {
                setError("OTP expired")
            }
            else setError('Unknown Error !')
        });


    }



    const onSubmitPartner = async (datas) => {
        const code = otpPartnerFinal;
        window.confirmationResult?.confirm(code).then(async (result) => {
            // User signed in successfully.
            const user = result?.user;

            const idToken = await user?.getIdToken()

            console.log(idToken,'idtoken partner');

            if (driverRole) {
                const { data: res } = await otpLogin({ uid: user?.uid, contactNumber: phonePartner, 
                    idToken: idToken, otpProvider: 'firebase', userType:DRIVER,firebaseDeviceToken:fcmToken })

                localStorage.setItem('role', 'driver')
                localStorage.setItem('userId', res?.userId)

            }
            else {
                const { data: res } = await otpLogin({ uid: user?.uid, contactNumber: phonePartner,
                     idToken: idToken, otpProvider: 'firebase', userType:CAR_OWNER,firebaseDeviceToken:fcmToken })

                localStorage.setItem('role', 'carowner')
                localStorage.setItem('userId', res?.userId)

            }

            setTimeout(
                setToastLogin(() => true)
                , 500)

            setTimeout(
                setOpen && setOpen(() => false)
                , 800)
            setTimeout(
                navigate('/profile')
                , 1000)

        }).catch((error) => {

            console.log(error, 'error');

            if (error?.message.includes('invalid')) {
                setError("OTP not matched")
            }
            if (error?.message.includes('expired')) {
                setError("OTP expired")
            }
            else setError('Unknown Error !')
        });


    }




    return (
        <div style={{ backgroundImage: `url(${'https://www.ligman.com/wp-content/uploads/2021/03/6.Project-Bangladesh-Street-Lighting-Installation-2-2048x1365.jpg'})`, backgroundSize: 'cover' }}
            className={`md:min-h-[700px] md:h-[94.5vh] h-[90vh]  w-[100%] bg-cover `}>
            <Snackbar open={toastOTP} autoHideDuration={3000}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    OTP sent Successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={toastLogin} autoHideDuration={3000}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Login occured Successfully!
                </Alert>
            </Snackbar>
            <div className=' md:pt-28 md:pl-40 bg-black bg-opacity-50 md:min-h-[700px] md:h-[94.5vh] h-[90vh] bg-cover w-[100%]  '>

                <div className='bg-white md:w-[500px]  md:h-[500px] h-[100%]'>

                    <Box className='flex justify-center md:hidden '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-28 h-16 text-[grey]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>

                    </Box>
                    <Box>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={tabValue} onChange={handleChangeTab} aria-label="basic tabs example" sx={{ backgroundColor: '#f7f7f7' }}>
                                <Tab className='normal-case' icon={<AirlineSeatLegroomExtraIcon />} disableRipple label="Passenger" {...a11yProps(0)} />
                                <Tab className='normal-case' icon={<CarRentalIcon />} disableRipple label="Partner" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <Box>
                            <TabPanel value={tabValue} index={0} className='flex justify-center'>
                                <div>
                                    <form className="" onSubmit={handleSubmit(onSubmitPassenger)}>

                                        <p className='font-semibold my-10 text-primary'>
                                            Continue to GoRental
                                        </p>
                                        {
                                            loginPassenger ?
                                                <Box>
                                                    <p className='text-primary my-2 text-xs'>Enter OTP</p>
                                                    <MuiOtpInput
                                                        length={6}
                                                        onComplete={handleCompleteOtpPassenger}
                                                        value={otpPassenger}
                                                        onChange={(val) => {
                                                            setOtpPasssenger(val)
                                                        }}
                                                    />
                                                    <Box className='flex justify-between'>
                                                        <Box className="countdown-text mt-2 text-xs">

                                                            {seconds > 0 ? (
                                                                <p>
                                                                    Time Remaining: {`00`}:
                                                                    {seconds < 10 ? `0${seconds}` : seconds}
                                                                </p>
                                                            ) : (
                                                                <p>Didn't recieve code?</p>
                                                            )}

                                                            <button
                                                                disabled={seconds > 0}

                                                                className={`${!seconds > 0 ? 'text-primary' : 'text-[grey]'}`}
                                                                onClick={() => { setSeconds(60); handleLoginPassenger() }}
                                                            >
                                                                Resend OTP
                                                            </button>
                                                        </Box>
                                                        {
                                                            error && <p className='mt-2 text-xs text-[brown]'>{error}</p>
                                                        }
                                                    </Box>
                                                </Box>
                                                :
                                                <MuiPhoneNumber
                                                    className='w-[80vw] md:w-[350px]'
                                                    defaultCountry={'bd'}
                                                    onlyCountries={['bd']}
                                                    value={phonePassenger}
                                                    onChange={(c, t) => {
                                                        //   console.log(c, t, isValidPhoneNumber(c));
                                                        isValidPhoneNumber(c) && setPhonePassenger(c)

                                                    }}
                                                />
                                        }

                                        {
                                            loginPassenger ?
                                                <div className='mt-10 flex justify-between'>
                                                    <Button size='small' onClick={() => setLoginPassenger(() => !loginPassenger)} variant="text"><span className='font-normal items-center flex '> <ArrowBackIcon style={{ height: '17px' }}></ArrowBackIcon>
                                                        <span className='ml-1'>Back</span></span></Button>
                                                    <Button onClick={onSubmitPassenger} type='submit' size='small' variant="contained">Log In</Button>
                                                </div>
                                                :
                                                <div className='mt-10 flex flex-row-reverse'>
                                                    <Button id='passenger-sign' disabled={phonePassenger ? false : true} type='submit' size='small' onClick={() => { handleLoginPassenger(); setLoginPassenger(() => !loginPassenger) }} variant="contained"> <span className=''>Next</span> <ArrowForwardIcon style={{ height: '17px' }}></ArrowForwardIcon></Button>
                                                </div>
                                        }
                                    </form>
                                </div>
                            </TabPanel>
                            <TabPanel value={tabValue} index={1} className='flex justify-center'>

                                {
                                    (!carOwnerRole && !driverRole) &&
                                    <Box className='flex flex-col space-y-10 my-28 mx-auto'>
                                        <Button className='w-[250px]' size='small' onClick={() => { setCarOwnerRole(() => true) }} variant="contained"> <span className=''>Car Owner</span> <ArrowForwardIcon style={{ height: '17px' }}></ArrowForwardIcon></Button>
                                        <Button className='w-[250px]' size='small' onClick={() => { setDriverRole(() => true) }} variant="contained"> <span className=''>Driver</span> <ArrowForwardIcon style={{ height: '17px' }}></ArrowForwardIcon></Button>
                                    </Box>
                                }

                                {
                                    (carOwnerRole || driverRole) &&
                                    <div>
                                        <form className="" >

                                            <p className='font-semibold my-10 text-primary'>
                                                Continue to GoRental
                                            </p>
                                            {
                                                loginPartner ?
                                                    <Box>
                                                        <p className='text-primary my-2 text-xs'>Enter OTP</p>
                                                        <MuiOtpInput
                                                            length={6}
                                                            onComplete={handleCompleteOtpPartner}
                                                            value={otpPartner}
                                                            onChange={(val) => setOtpPartner(val)}
                                                        />
                                                        <Box className='flex justify-between'>
                                                            <Box className="countdown-text mt-2 text-xs">
                                                                {seconds > 0 ? (
                                                                    <p>
                                                                        Time Remaining: {`00`}:
                                                                        {seconds < 10 ? `0${seconds}` : seconds}
                                                                    </p>
                                                                ) : (
                                                                    <p>Didn't recieve code?</p>
                                                                )}

                                                                <button
                                                                    disabled={seconds > 0}

                                                                    className={`${!seconds > 0 ? 'text-primary' : 'text-[grey]'}`}
                                                                    onClick={() => { setSeconds(60); handleLoginPartner() }}
                                                                >
                                                                    Resend OTP
                                                                </button>
                                                            </Box>
                                                            {
                                                                error && <p className='mt-2 text-xs text-[brown]'>{error}</p>
                                                            }
                                                        </Box>
                                                    </Box>
                                                    :
                                                    <MuiPhoneNumber
                                                        className='w-[80vw] md:w-[350px]'
                                                        defaultCountry={'bd'}
                                                        onlyCountries={['bd']}
                                                        value={phonePartner}
                                                        onChange={(c, t) => {
                                                            //   console.log(c, t, isValidPhoneNumber(c));
                                                            isValidPhoneNumber(c) && setPhonePartner(c)
                                                        }}
                                                    />
                                            }

                                            {
                                                loginPartner ?
                                                    <div className='mt-10 flex justify-between'>
                                                        <Button size='small' onClick={() => setLoginPartner(() => !loginPartner)} variant="text"> <span className='font-normal flex items-center'> <ArrowBackIcon style={{ height: '17px' }}></ArrowBackIcon>
                                                            <span className='ml-1'>Back</span> </span>
                                                        </Button>

                                                        <Button onClick={onSubmitPartner} size='small' variant="contained">Log In</Button>
                                                    </div>
                                                    :
                                                    <div className='mt-10 flex justify-between'>
                                                        <Button size='small' onClick={() => { setDriverRole(() => false); setCarOwnerRole(() => false) }} variant="text"><span className='font-normal flex items-center'> <ArrowBackIcon style={{ height: '17px' }}></ArrowBackIcon> <span className='ml-1'>Back</span></span></Button>

                                                        <Button id='partner-sign' disabled={phonePartner ? false : true} type='submit' size='small' onClick={() => { handleLoginPartner(); setLoginPartner(() => !loginPartner) }} variant="contained"> <span className=''>Next</span> <ArrowForwardIcon style={{ height: '17px' }}></ArrowForwardIcon></Button>
                                                    </div>
                                            }
                                        </form>
                                    </div>
                                }
                            </TabPanel>
                        </Box>
                    </Box>
                </div>
            </div>
        </div>
    );
}