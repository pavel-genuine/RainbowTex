import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Avatar, Box, IconButton, ImageListItem, ImageListItemBar, ListItemAvatar } from '@mui/material';
import { ArrowIcon } from './CarOwnerAddCar';
import { Link } from 'react-router-dom';
import { carOwnerProfile, carOwnerProfileUpdate, submitCarOwnerNID, submitCarOwnerNIDBack, submitCarOwnerNIDFront } from '../../../api/api';
import { useQuery } from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { Slide } from 'react-slideshow-image';
import { TextField } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MuiPhoneNumber from 'material-ui-phone-number';
import {
    isValidPhoneNumber,
} from 'libphonenumber-js';
import { addDriver } from '../../../api/api';
import { useEffect } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export const IconEdit = ({ color }) => {
    return (
        <IconButton className='w-10 h-10' style={{ color: color }} aria-label="back">
            <EditIcon sx={{ fontSize: '18px' }} />
        </IconButton>
    )
}

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CarOwnerInfoDoc() {
    const [expanded, setExpanded] = React.useState('panel1');


    const { register, formState: { errors }, handleSubmit } = useForm();

    const [openName, setOpenName] = React.useState(false);
    const [openPhone, setOpenPhone] = React.useState(false);
    const [openMail, setOpenMail] = React.useState(false);
    const [openLocation, setOpenLocation] = React.useState(false);
    const [nidFront, setNidFront] = React.useState('');
    const [nidBack, setNidBack] = React.useState('');

    const [phoneDriver, setPhoneDriver] = React.useState(false);

  

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const fetcher = async () => {
        const { data } = await carOwnerProfile()
        return data
    }

    let { data, isLoading } = useQuery(["ownerprofile",], () => fetcher())


    const handleClickOpenName = () => {
        setOpenName(true);
    };
    const handleCloseName = () => {
        setOpenName(false);
    };
    const handleClickOpenPhone = () => {
        setOpenPhone(true);
    };
    const handleClosePhone = () => {
        setOpenPhone(false);
    };
    const handleClickOpenMail = () => {
        setOpenMail(true);
    };
    const handleCloseMail = () => {
        setOpenMail(false);
    };
    const handleClickOpenLocation = () => {
        setOpenLocation(true);
    };
    const handleCloseLocation = () => {
        setOpenLocation(false);
    };


    const onSubmit = async (data) => {

        const { data: uData } = await carOwnerProfileUpdate(data)
    }

    const handleNidFront = async(e) => {
        const file = e.target.files[0];
        const image = URL.createObjectURL(file)
        setNidFront(() =>image)
        const formData = new FormData();
        file && formData.append('ownerId',data?.id);
        file && formData.append('nidfront',file);
        if (file) {
            const { data } = await submitCarOwnerNIDFront(formData)

            console.log(data, 'front');
        }
    }
    const handleNidBack =async (e) => {
        const file = e.target.files[0];
        const image = URL.createObjectURL(file)
        sessionStorage.setItem('nidBack', image)
        setNidBack(() => sessionStorage.getItem('nidBack'))
        const formData = new FormData();
        file && formData.append('ownerId',data?.id);
        file && formData.append('nidback',file);
        
        if (file) {
            const { data } = await submitCarOwnerNIDBack(formData)

            console.log(data, 'back');
        }

    }

    return (
        <Box className='md:pt-20 pt-16 mx-auto relative min-h-[100vh] w-[100vw] md:w-[360px]' sx={{ bgcolor: 'background.paper' }}>
            <Box className='flex items-center py-1  bg-primary text-white '>
                <Link to='/profile'>
                    <IconButton className='w-10 h-10' style={{ color: 'white' }} aria-label="back">
                        <ArrowIcon />
                    </IconButton>
                </Link>
                <h1 className='md:text-lg mx-auto text-md pr-5 '>Information & Documents </h1>
            </Box>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>General Information</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: 0 }}>
                    <div className='active:bg-[#efeeef] cursor-pointer px-5 py-3 flex justify-between items-center'>
                        <div>
                            <h1 className='text-sm font-semibold'>Name :</h1>
                            <h1 className=''>{data?.name}</h1>
                        </div>
                        <div onClick={handleClickOpenName}>
                            <IconEdit color={'black'}></IconEdit>
                        </div>
                    </div>
                    <Divider></Divider>
                    <BootstrapDialog
                        fullWidth={true}
                        onClose={handleCloseName}
                        aria-labelledby="customized-dialog-title"
                        open={openName}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseName}>
                            <p className='text-lg text-center text-primary'>Update Your Name</p>
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <form className="flex  space-y-10  flex-col mt-5 mb-10 md:px-10" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control flex flex-col">
                                    <TextField
                                        className='mx-auto w-[100%]'
                                        type="text"
                                        placeholder="Name"
                                        {...register("name", {
                                            // required: {
                                            //     value: true,
                                            //     message: 'Brand is Required'
                                            // }
                                        })}
                                        variant="standard"
                                    />

                                    <label className="label">
                                        {/* {errors?.name?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.name.message}</span>} */}
                                    </label>
                                </div>

                                <Button type='submit' className='rounded-md px-4 text-sm py-2 text-white bg-primary' variant='contained' autoFocus
                                >
                                    Submit
                                </Button>
                            </form>
                        </DialogContent>
                    </BootstrapDialog>
                    <div className='active:bg-[#efeeef] cursor-pointer px-5 py-3 flex justify-between items-center'>
                        <div>
                            <h1 className='text-sm font-semibold'>Phone Number :</h1>
                            <h1 className=''>{data?.contactNumber}</h1>
                        </div>
                        <div onClick={handleClickOpenPhone}>
                            {/* <IconEdit color={'black'}></IconEdit> */}
                        </div>
                    </div>
                    <Divider></Divider>
                    <BootstrapDialog
                        fullWidth={true}
                        onClose={handleClosePhone}
                        aria-labelledby="customized-dialog-title"
                        open={openPhone}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClosePhone}>
                            <p className='text-lg text-center text-primary'>Update Your Phone Number</p>
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <form className="flex  space-y-10  flex-col mt-5 mb-10 md:px-10" onSubmit={handleSubmit(onSubmit)}>

                                <MuiPhoneNumber
                                    className='w-[100%]'
                                    defaultCountry={'bd'}
                                    onlyCountries={['bd']}
                                    value={phoneDriver}
                                    onChange={(c, t) => {
                                        //   console.log(c, t, isValidPhoneNumber(c));
                                        isValidPhoneNumber(c) && setPhoneDriver(c)

                                    }}
                                />
                                <Button type='submit' className='rounded-md px-4 text-sm py-2 text-white bg-primary' variant='contained' autoFocus
                                >
                                    Submit
                                </Button>
                            </form>
                        </DialogContent>
                    </BootstrapDialog>
                    <div className='active:bg-[#efeeef] cursor-pointer px-5 py-3  flex justify-between items-center'>
                        <div>
                            <h1 className='text-sm font-semibold'>Email :</h1>
                            <h1 className=''>{data?.mail}</h1>
                        </div>
                        <div onClick={handleClickOpenMail}>
                            <IconEdit color={'black'}></IconEdit>
                        </div>
                    </div>
                    <Divider></Divider>
                    <BootstrapDialog
                        fullWidth={true}
                        onClose={handleCloseMail}
                        aria-labelledby="customized-dialog-title"
                        open={openMail}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseMail}>
                            <p className='text-lg text-center text-primary'>Update Your Email</p>
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <form className="flex  space-y-10  flex-col mt-5 mb-10 md:px-10" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control flex flex-col">
                                    <TextField
                                        className='mx-auto w-[100%]'
                                        type="email"
                                        placeholder="Mail"
                                        {...register("mail", {
                                            // required: {
                                            //     value: true,
                                            //     message: 'Brand is Required'
                                            // }
                                        })}
                                        variant="standard"
                                    />

                                    <label className="label">
                                        {/* {errors?.name?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.name.message}</span>} */}
                                    </label>
                                </div>

                                <Button type='submit' className='rounded-md px-4 text-sm py-2 text-white bg-primary' variant='contained' autoFocus
                                >
                                    Submit
                                </Button>
                            </form>
                        </DialogContent>
                    </BootstrapDialog>
                    <div className='active:bg-[#efeeef] cursor-pointer px-5 py-3 flex justify-between items-center'>
                        <div>
                            <h1 className='text-sm font-semibold'>Location :</h1>
                            <h1 className=''>{data?.officeLocation}</h1>
                        </div>
                        <div onClick={handleClickOpenLocation}>
                            <IconEdit color={'black'}></IconEdit>
                        </div>
                    </div>
                    <BootstrapDialog
                        fullWidth={true}
                        onClose={handleCloseLocation}
                        aria-labelledby="customized-dialog-title"
                        open={openLocation}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseLocation}>
                            <p className='text-lg text-center text-primary'>Update Your Location</p>
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <form className="flex  space-y-10  flex-col mt-5 mb-10 md:px-10" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control flex flex-col">
                                    <TextField
                                        className='mx-auto w-[100%]'
                                        type="text"
                                        placeholder="Location"
                                        {...register("officeLocation", {
                                            // required: {
                                            //     value: true,
                                            //     message: 'Brand is Required'
                                            // }
                                        })}
                                        variant="standard"
                                    />

                                    <label className="label">
                                        {/* {errors?.name?.type === 'required' && <span className="label-text-alt text-xs text-[brown]">{errors?.name.message}</span>} */}
                                    </label>
                                </div>

                                <Button type='submit' className='rounded-md px-4 text-sm py-2 text-white bg-primary' variant='contained' autoFocus
                                >
                                    Submit
                                </Button>
                            </form>
                        </DialogContent>
                    </BootstrapDialog>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>NID  card (front-side)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className=' px-2 py-2 flex justify-between items-center'>

                        <h1 className='text-sm font-semibold'>NID card (front-side) :</h1>
                        <div>
                            <input
                                id="nid-front"
                                className=" hidden"
                                type="file"
                                accept="image/*"
                                onChange={handleNidFront}
                            />
                            <label htmlFor="nid-front" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>

                            </label>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center  items-center pb-5 my-3 ">
                            <ImageListItem
                                sx={{
                                    width: 220,
                                    height: 160,
                                }}
                            >
                                <img
                                    src={nidFront?nidFront:data?.nidFront}
                                    loading="lazy"
                                    alt='nid-front'
                                />

                                <ImageListItemBar
                                    sx={{
                                        background:
                                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    }}
                                    position="top"
                                    // actionIcon={
                                    //     <IconButton
                                    //         onClick={() => setNidFront(sessionStorage.removeItem('nidFront'))}
                                    //         sx={{ color: 'white' }}
                                    //     >
                                    //         <CloseIcon />
                                    //     </IconButton>
                                    // }
                                    actionPosition="left"
                                />
                            </ImageListItem>
                        </div>
                    </div>

                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>NID  card (back-side)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className=' px-2 py-2 flex justify-between items-center'>

                        <h1 className='text-sm font-semibold'>NID card (back-side) :</h1>
                        <div>
                            <input
                                id="nid-back"
                                className=" hidden"
                                type="file"
                                accept="image/*"
                                onChange={handleNidBack}
                            />
                            <label htmlFor="nid-back" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>

                            </label>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center  items-center pb-5 my-3 ">
                            <ImageListItem
                                sx={{
                                    width: 220,
                                    height: 160,
                                }}
                            >
                                <img
                                    src={nidBack?nidBack:data?.nidBack}
                                    loading="lazy"
                                    alt='nid-back'
                                />
                                <ImageListItemBar
                                    sx={{
                                        background:
                                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    }}
                                    position="top"
                                    // actionIcon={
                                    //     <IconButton
                                    //         onClick={() => setNidBack(sessionStorage.removeItem('nidBack'))}
                                    //         sx={{ color: 'white' }}
                                    //     >
                                    //         <CloseIcon />
                                    //     </IconButton>
                                    // }
                                    actionPosition="left"
                                />
                            </ImageListItem>
                        </div>
                    </div>

                </AccordionDetails>
            </Accordion>
        </Box>
    );
}