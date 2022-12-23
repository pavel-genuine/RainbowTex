import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, createTheme, TextField, ThemeProvider } from '@mui/material';
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
import { signInPartner, signInPassenger } from '../../api/api';
export let accessTokenPassenger;
export let accessTokenPartner;

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
export default function AuthHome() {
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

    const theme = createTheme({
        palette: {
            primary: {
                main: "#5c0931",
                light: "#5c0931",
                dark: "#5c0931",
            },
        },
        zIndex: {
            drawer: 20
        }
    });

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleLoginPassenger = () => {

        phonePassenger && setLoginPassenger(() => !loginPassenger) && setEnabledPassenger(() => true)
    };

    const handleLoginPartner = () => {


        phonePartner && setLoginPartner(() => !loginPartner) && setEnabledPartner(() => true)
    };

    const onSubmitPassenger = async (datas) => {

        const passengerData = { phone: phonePassenger, otp: otpPasssengerFinal }
        const { data } = await signInPassenger(passengerData)
        const accessToken = data?.accessToken
        accessTokenPassenger = accessToken
    }
    const onSubmitPartner = async (datas) => {
        const partnerData = { phone: phonePartner, otp: otpPartnerFinal }
        const { data } = await signInPartner(partnerData)
        const accessToken = data?.accessToken
        accessTokenPartner = accessToken

    }

    const handleCompleteOtpPassenger = (finalValue) => {
        // alert(finalValue);
        setOtpPasssengerFinal(finalValue)
    };
    const handleCompleteOtpPartner = (finalValue) => {
        // alert(finalValue);
        setOtpPartnerFinal(finalValue)
    };



    return (
        <div style={{ backgroundImage: `url(${'https://www.ligman.com/wp-content/uploads/2021/03/6.Project-Bangladesh-Street-Lighting-Installation-2-2048x1365.jpg'})`, backgroundSize: 'cover' }}
            className='h-[110vh] md:h-[820px] md:min-h-[110vh] w-[100%] bg-cover'>
            <div className=' md:pt-28 md:pl-40 bg-black bg-opacity-50 h-[110vh] bg-cover w-[100%] md:h-[820px] md:min-h-[110vh] '>
                <div className='bg-white md:w-[500px] pt-20 md:pt-0 md:h-[500px] h-[100%]'>
                    <Box>
                        <ThemeProvider theme={theme}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={tabValue} onChange={handleChangeTab} aria-label="basic tabs example" sx={{ backgroundColor: '#f7f7f7' }}>
                                    <Tab icon={<AirlineSeatLegroomExtraIcon />} disableRipple label="Guest" {...a11yProps(0)} />
                                    <Tab icon={<CarRentalIcon />} disableRipple label="Partner" {...a11yProps(1)} />
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
                                                        <p className='text-primary my-2'>Enter OTP</p>
                                                        <MuiOtpInput
                                                            length={6}
                                                            onComplete={handleCompleteOtpPassenger}
                                                            value={otpPassenger}
                                                            onChange={(val) => {
                                                                setOtpPasssenger(val)
                                                            }}
                                                        />
                                                        <Box className="countdown-text mt-2">
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
                                                                onClick={() => setSeconds(60)}
                                                            >
                                                                Resend OTP
                                                            </button>
                                                        </Box>
                                                    </Box>
                                                    :
                                                    <MuiPhoneNumber
                                                        className='w-[90vw] md:w-[350px]'
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
                                                        <Button size='small' onClick={() => handleLoginPassenger()} variant="text"><span className='font-normal flex items-center'> <ArrowBackIcon style={{ height: '17px' }}></ArrowBackIcon> <span className='ml-1'>Back</span></span></Button>
                                                        <Button type='submit' size='small' variant="contained">Log In</Button>
                                                    </div>
                                                    :
                                                    <div className='mt-10 flex flex-row-reverse'>
                                                        <Button disabled={ phonePassenger? false :true} type='submit' size='small' onClick={() => handleLoginPassenger()} variant="contained"> <span className=''>Next</span> <ArrowForwardIcon style={{ height: '17px' }}></ArrowForwardIcon></Button>
                                                    </div>
                                            }
                                        </form>
                                    </div>
                                </TabPanel>
                                <TabPanel value={tabValue} index={1} className='flex justify-center'>
                                    <div>
                                        <form className="" onSubmit={handleSubmit(onSubmitPartner)}>

                                            <p className='font-semibold my-10 text-primary'>
                                                Continue to GoRental
                                            </p>
                                            {
                                                loginPartner ?
                                                    <Box>
                                                        <p className='text-primary my-2'>Enter OTP</p>
                                                        <MuiOtpInput
                                                            length={6}
                                                            onComplete={handleCompleteOtpPartner}
                                                            value={otpPartner}
                                                            onChange={(val) => setOtpPartner(val)}
                                                        />
                                                        <Box className="countdown-text mt-2">
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
                                                                onClick={() => setSeconds(60)}
                                                            >
                                                                Resend OTP
                                                            </button>
                                                        </Box>

                                                    </Box>
                                                    :
                                                    <MuiPhoneNumber
                                                        className='w-[90vw] md:w-[350px]'
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
                                                        <Button size='small' onClick={() => handleLoginPartner()} variant="text"><span className='font-normal flex items-center'> <ArrowBackIcon style={{ height: '17px' }}></ArrowBackIcon> <span className='ml-1'>Back</span></span></Button>
                                                        <Button type='submit' size='small' variant="contained">Log In</Button>
                                                    </div>
                                                    :
                                                    <div className='mt-10 flex flex-row-reverse'>
                                                        <Button disabled={ phonePartner? false :true} type='submit' size='small' onClick={() => handleLoginPartner()} variant="contained"> <span className=''>Next</span> <ArrowForwardIcon style={{ height: '17px' }}></ArrowForwardIcon></Button>
                                                    </div>
                                            }
                                        </form>
                                    </div>
                                </TabPanel>
                            </Box>
                        </ThemeProvider>
                    </Box>
                </div>
            </div>
        </div>
    );
}