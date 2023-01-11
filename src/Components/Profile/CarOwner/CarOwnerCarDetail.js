import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Avatar, Box, IconButton, ImageListItem, ImageListItemBar, ListItemAvatar } from '@mui/material';
import { ArrowIcon } from './CarOwnerAddCar';
import { Link, useParams } from 'react-router-dom';
import { carOwnerCarUpdate, carOwnerProfile } from '../../../api/api';
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

export default function CarOwnerCarDetail() {

    const {id} =useParams()

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [expanded, setExpanded] = React.useState('panel1');
    const [openName, setOpenName] = React.useState(false);
    const [openPhone, setOpenPhone] = React.useState(false);
    const [openMail, setOpenMail] = React.useState(false);
    const [openLocation, setOpenLocation] = React.useState(false);

    const [phoneDriver, setPhoneDriver] = React.useState(false);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const fetcher = async () => {
        const { data } = await carOwnerProfile()
        return data
    }

    let { data, isLoading } = useQuery(["ownerprofile",], () => fetcher())

    // console.log('owner cars', data);

    const handleClickOpenBrand = () => {
        setOpenName(true);
    };
    const handleCloseBrand = () => {
        setOpenName(false);
    };
    const handleClickOpenModel = () => {
        setOpenPhone(true);
    };
    const handleCloseModel = () => {
        setOpenPhone(false);
    };
    const handleClickOpenYear = () => {
        setOpenMail(true);
    };
    const handleCloseYear = () => {
        setOpenMail(false);
    };
    const handleClickOpenLocation = () => {
        setOpenLocation(true);
    };
    const handleCloseLocation = () => {
        setOpenLocation(false);
    };


    const onSubmit = async (data) => {
        //   console.log(data,'drv');
        const {data:updatedeData}=await carOwnerCarUpdate(data)

    }


    const handleNidFront = (e) => {
        const file = e.target.files[0];
        // setTaxToken(() => file)
        const image = URL.createObjectURL(file)
        sessionStorage.setItem('taxToken', image)
        // setTaxTokenRender(() => sessionStorage.getItem('taxToken'))
        const formData = new FormData();
        // taxToken && formData.append('carId', carId);
        // setError(() => '')
    }
    const handleNidBack = (e) => {
        const file = e.target.files[0];
        // setTaxToken(() => file)
        const image = URL.createObjectURL(file)
        sessionStorage.setItem('taxToken', image)
        // setTaxTokenRender(() => sessionStorage.getItem('taxToken'))
        // setError(() => '')
        const formData = new FormData();
        // taxToken && formData.append('carId', carId);
    }


    return (
        <Box className='md:pt-20 pt-16 mx-auto relative min-h-[100vh] w-[100vw] md:w-[360px]' sx={{ bgcolor: 'background.paper' }}>
            <Box className='flex items-center py-1  bg-primary text-white '>
                <Link to='/carowner-vehicle-list'>
                    <IconButton className='w-10 h-10' style={{ color: 'white' }} aria-label="back">
                        <ArrowIcon />
                    </IconButton>
                </Link>
                <h1 className='md:text-lg mx-auto text-md pr-5 '>Car Detail </h1>
            </Box>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>General Information</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: 0 }}>
                    <div className='active:bg-[#efeeef] cursor-pointer px-5 py-3 border-b flex justify-between items-center'>
                        <div>
                            <h1 className='text-sm font-semibold'>Brand :</h1>
                            <h1 className=''>Toyota</h1>
                        </div>
                        <div onClick={handleClickOpenBrand}>
                            <IconEdit color={'black'}></IconEdit>
                        </div>
                    </div>

                    <BootstrapDialog
                        fullWidth={true}
                        onClose={handleCloseBrand}
                        aria-labelledby="customized-dialog-title"
                        open={openName}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseBrand}>
                            <p className='text-lg text-center text-primary'>Update Brand Name</p>
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <form className="flex  space-y-10  flex-col mt-5 mb-10 md:px-10" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control flex flex-col">
                                    <TextField
                                        className='mx-auto w-[100%]'
                                        type="text"
                                        placeholder="Brand"
                                        {...register("brand", {
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
                    <div className='active:bg-[#efeeef] cursor-pointer px-5 py-3 border-b flex justify-between items-center'>
                        <div>
                            <h1 className='text-sm font-semibold'>Model :</h1>
                            <h1 className=''>Premio F</h1>
                        </div>
                        <div onClick={handleClickOpenModel}>
                            <IconEdit color={'black'}></IconEdit>
                        </div>
                    </div>
                    <BootstrapDialog
                        fullWidth={true}
                        onClose={handleCloseModel}
                        aria-labelledby="customized-dialog-title"
                        open={openPhone}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseModel}>
                            <p className='text-lg text-center text-primary'>Update Model</p>
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                        <form className="flex  space-y-10  flex-col mt-5 mb-10 md:px-10" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control flex flex-col">
                                    <TextField
                                        className='mx-auto w-[100%]'
                                        type="text"
                                        placeholder="Model"
                                        {...register("model", {
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
                    <div className='active:bg-[#efeeef] cursor-pointer px-5 py-3 border-b flex justify-between items-center'>
                        <div>
                            <h1 className='text-sm font-semibold'>Year :</h1>
                            <h1 className=''>2021</h1>
                        </div>
                        <div onClick={handleClickOpenYear}>
                            <IconEdit color={'black'}></IconEdit>
                        </div>
                    </div>
                    <BootstrapDialog
                        fullWidth={true}
                        onClose={handleCloseYear}
                        aria-labelledby="customized-dialog-title"
                        open={openMail}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseYear}>
                            <p className='text-lg text-center text-primary'>Update Year</p>
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <form className="flex  space-y-10  flex-col mt-5 mb-10 md:px-10" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control flex flex-col">
                                    <TextField
                                        className='mx-auto w-[100%]'
                                        type="number"
                                        placeholder="Year"
                                        {...register("year", {
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
                    <Typography>Car Images</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className=' px-2 py-2 flex justify-between items-center'>

                        <h1 className='text-sm font-semibold'>Car Images :</h1>
                        <div>
                            <input
                                id="carImages"
                                className=" hidden"
                                type="file"
                                accept="image/*"
                                onChange={handleNidFront}
                            />
                            <label htmlFor="carImages" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
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
                                    // src={taxTokenRender}
                                    loading="lazy"
                                    alt='carImages'
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
                                    //         onClick={() => setTaxTokenRender(sessionStorage.removeItem('taxToken'))}
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
                <AccordionSummary aria-controls="panel4d-content" id="panel3d-header">
                    <Typography>Registration Paper</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className=' px-2 py-2 flex justify-between items-center'>

                        <h1 className='text-sm font-semibold'>Registration Paper :</h1>
                        <div>
                            <input
                                id="registration"
                                className=" hidden"
                                type="file"
                                accept="image/*"
                                onChange={handleNidBack}
                            />
                            <label htmlFor="registration" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
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
                                    // src={taxTokenRender}
                                    loading="lazy"
                                    alt='registration'
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
                                    //         onClick={() => setTaxTokenRender(sessionStorage.removeItem('taxToken'))}
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
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary aria-controls="panel4d-content" id="panel3d-header">
                    <Typography>Fitness Paper</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className=' px-2 py-2 flex justify-between items-center'>

                        <h1 className='text-sm font-semibold'>Fitness Paper :</h1>
                        <div>
                            <input
                                id="fitness"
                                className=" hidden"
                                type="file"
                                accept="image/*"
                                onChange={handleNidBack}
                            />
                            <label htmlFor="fitness" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
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
                                    // src={taxTokenRender}
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
                                    // actionIcon={
                                    //     <IconButton
                                    //         onClick={() => setTaxTokenRender(sessionStorage.removeItem('taxToken'))}
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
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary aria-controls="panel5d-content" id="panel3d-header">
                    <Typography>Tax Token</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className=' px-2 py-2 flex justify-between items-center'>

                        <h1 className='text-sm font-semibold'>Tax Token :</h1>
                        <div>
                            <input
                                id="taxToken"
                                className=" hidden"
                                type="file"
                                accept="image/*"
                                onChange={handleNidBack}
                            />
                            <label htmlFor="taxToken" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
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
                                    // src={taxTokenRender}
                                    loading="lazy"
                                    alt='taxToken'
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
                                    //         onClick={() => setTaxTokenRender(sessionStorage.removeItem('taxToken'))}
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