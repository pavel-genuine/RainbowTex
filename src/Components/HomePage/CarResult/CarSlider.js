import React from 'react'
import { MobileStepper } from '@mui/material'
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@mui/material/styles';

const CarSlider = ({ car, small }) => {

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);


    const images = [
        {
            label: 'img1',
            imgPath: car?.img1
        },
        {
            label: 'img2',
            imgPath: car?.img2
        },
        {
            label: 'img3',
            imgPath: car?.img3
        },
        {
            label: 'img4',
            imgPath: car?.img4
        },
    ];

    const maxSteps = images.length;




    const handleStepChange = (step) => {
        setActiveStep(step);
    };


    return (
        <Box>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {images.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    height: small ? 100 : 255,
                                    display: 'block',
                                    maxWidth: small ? 160 : 400,
                                    overflow: 'hidden',
                                    width: '100%',
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </SwipeableViews>

            <MobileStepper
                className={`my-1 ${small ? 'absolute top-0 right-[0px]' : 'w-[20%] mx-auto '}`}

                steps={maxSteps}
                position="static"
                activeStep={activeStep}
            />
        </Box>
    )
}

export default CarSlider