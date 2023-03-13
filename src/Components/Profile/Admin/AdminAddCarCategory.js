import { Button, Dialog, IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useForm } from 'react-hook-form';
import { ArrowIcon } from '../CarOwner/CarOwnerAddCar';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';

const AdminAddCarCategory = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [openAddCar, setOpenAddCar] = React.useState(false);
    const [vehicleImage, setVehicleIamge] = React.useState(false);
    const [iamge1, setIamge1] = React.useState(false);
    const handleVehicleImage = (e) => {
        const file = e.target.files[0];
        setIamge1(() => file)
        const image = URL.createObjectURL(file)
        sessionStorage.setItem('vehicleImage', image)
        setVehicleIamge(() => sessionStorage.getItem('vehicleImage'))
    }
    const onSubmit = async (data) => {


    }
    return (
        <div >
            <Box>
                <Button
                    onClick={() => { setOpenAddCar(true) }}
                    variant='contained'>+  <span> Add Vehicle</span></Button>
            </Box>

            <Dialog
                className='bg-primary '
                transitionDuration={1}
                open={openAddCar}
                onClose={() => setOpenAddCar(false)}
                onOpen={() => setOpenAddCar(true)}
                fullScreen
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <Box className='w-[100%] md:w-[360px] mx-auto'>
                    <Box className='flex items-center mb-7 py-1  bg-primary text-white '>
                        <IconButton className='w-10 h-10' style={{ color: 'white' }} onClick={() => setOpenAddCar(false)} aria-label="back">
                            <ArrowIcon />
                        </IconButton>
                        <h1 className='md:text-lg mx-auto text-md pr-5 '>Add Vehicle </h1>
                    </Box>
                    <form className="pt-5 pb-14 relative w-[90%] mx-auto " onSubmit={handleSubmit(onSubmit)}>

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

                        </div>


                        <input
                            id="file-upload"
                            className=" hidden"
                            type="file"
                            accept="image/*"
                            onChange={handleVehicleImage}
                        />

                        <div className='flex flex-col justify-center items-center'>
                            {!vehicleImage ?
                                <div>
                                    <div className=" px-6 pt-5 pb-6">
                                        <div className="space-y-1 text-center">
                                            <div className="flex text-sm text-gray-600 ">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium hover:text-primary">
                                                    <AddPhotoAlternateIcon sx={{ stroke: "#ffffff", strokeWidth: 1.3, scale: "2" }} ></AddPhotoAlternateIcon>
                                                    <p className='my-2'>Add Image</p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :

                                <div>
                                    <img className='my-5 rounded-md' src={vehicleImage} alt="" srcset="" />

                                    <div className='relative'>
                                        <IconButton onClick={() => setVehicleIamge(sessionStorage.removeItem('vehicleImage'))} className='w-6 h-6 absolute md:left-[20%]' style={{ color: 'white' }} aria-label="back">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            }
                            <div className=''>
                                <Button
                                    type='submit' size='small'
                                    variant="contained"> Save </Button>
                            </div>
                        </div>

                    </form>
                </Box>
            </Dialog>


        </div>
    )
}

export default AdminAddCarCategory