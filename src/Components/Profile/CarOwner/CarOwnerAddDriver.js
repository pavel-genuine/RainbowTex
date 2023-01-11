
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Slide } from 'react-slideshow-image';
import { Box, TextField } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useForm } from 'react-hook-form';
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

export default function CarOwnerAddDriver() {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [open, setOpen] = React.useState(false);
    const [phoneDriver, setPhoneDriver] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // console.log(phoneDriver,'phdr');

    const onSubmit = async (data) => {

        const { data: res } = await addDriver({ name: data?.name, contactNumber: phoneDriver })

        //   console.log(res,'drvr');
    }



    return (
        <div>
            <Box>
                <Button onClick={handleClickOpen} variant='contained'> <PersonAddIcon></PersonAddIcon> <span className='ml-2'> Add Driver</span></Button>

            </Box>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <p className='text-lg text-center text-primary'>Driver information</p>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <form className="flex  space-y-10 my-5 justify-center items-center flex-col relative  mx-auto" onSubmit={handleSubmit(onSubmit)}>
                        <p className='text-sm text-justify md:px-28'>Add an active phone number of the driver. We'll create an account for him & connect with your profile.</p>

                        <div className="form-control flex flex-col w-[100%] md:px-28">
                            <TextField
                                className='w-[100%] md:w-[350px] mx-auto'
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



                        <MuiPhoneNumber
                            className='w-[100%] md:w-[350px]'
                            defaultCountry={'bd'}
                            onlyCountries={['bd']}
                            value={phoneDriver}
                            onChange={(c, t) => {
                                //   console.log(c, t, isValidPhoneNumber(c));
                                isValidPhoneNumber(c) && setPhoneDriver(c)

                            }}

                        />
                        {/* <DialogActions> */}
                        <Button disabled={phoneDriver ? false : true} className='rounded-md px-4 text-sm py-2 text-white bg-primary' variant='contained' autoFocus
                        >
                            Submit
                        </Button>
                        {/* </DialogActions> */}
                    </form>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}
