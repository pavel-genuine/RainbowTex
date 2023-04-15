import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Commitments() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ marginTop: 5, position: 'relative' }}>


            {
                value == 0 &&
                <img
                    className='w-[100vw] h-[70vh] lg:h-[85vh]'
                    src="https://i.ibb.co/jbYx36d/Screenshot-2023-04-14-115727.png" alt="" />
            }
            {
                value == 1 &&
                <img
                    className='w-[100vw] h-[70vh]  lg:h-[85vh]'
                    src="https://i.ibb.co/2jkrCTb/Screenshot-2023-04-14-121140.png" alt="" />
            }
            {
                value == 2 &&
                <img
                    className='w-[100vw] h-[70vh]  lg:h-[85vh]'
                    src="https://i.ibb.co/VwmYGqC/istockphoto-615426408-170667a.jpg" alt="" />
            }
            {
                value == 3 &&
                <img
                    className='w-[100vw] h-[70vh]  lg:h-[85vh]'
                    src="https://i.ibb.co/GpLW5yB/Image-by-Firn-from-Firn-Canva-Pro.jpg" alt="" />
            }
            {
                value == 4 &&
                <img
                    className='w-[100vw] h-[70vh] lg:h-[85vh]'
                    src="https://i.ibb.co/1rDNT49/nanotech-iabr3g.jpg" alt="" />
            }

            <Box
                className='absolute top-[0px] lg:left-[150px] left-[0px]'
                sx={{ flexGrow: 1, display: 'flex', }}
            >
                <div className='h-[70vh]  lg:h-[85vh] bg-[white] opacity-80'>
                    <motion.div
                        viewport={{ once: true }}
                        initial={{ y: 80, opacity: .1 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: .2, delay: 0, }}
                    >
                        <Box className='w-[40vw] lg:w-[20vw] pr-5  md:pl-[6vw]'
                            sx={{}}>

                            <p className='lg:ml-8 ml-5 lg:my-16 my-[7vh] font-semibold text-2xl text-textPrimary'>Standards</p>

                            <Tabs
                                className=' lg:h-[70vh]  '
                                orientation="vertical"
                                variant="scrollable"
                                value={value}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                sx={{ borderRight: 1, borderColor: 'divider' }}
                            >

                                <Tab sx={{ fontSize: 20, width: 150, marginBottom: 2,textAlign:'center' }} label="Quality" {...a11yProps(0)} />
                                <Tab sx={{ fontSize: 20, width: 150, marginBottom: 2,textAlign:'center' }} label="Reliability" {...a11yProps(1)} />
                                <Tab sx={{ fontSize: 20, width: 150, marginBottom: 2,textAlign:'center' }} label="Commitment" {...a11yProps(2)} />
                                <Tab sx={{ fontSize: 20, width: 150, marginBottom: 2,textAlign:'center' }} label="Eco-friendly" {...a11yProps(3)} />
                                <Tab sx={{ fontSize: 20, width: 150, marginBottom: 2,textAlign:'center' }} label="Hi-tech" {...a11yProps(4)} />
                            </Tabs>
                        </Box>
                    </motion.div>
                </div>
                <motion.div
                    className='absolute bottom-0 left-[40vw] lg:left-[30vw] w-[60vw] lg:w-[700px]'
                    viewport={{ once: true }}
                    initial={{ y: 40, opacity: .1 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: .2, delay: 0, }}
                >
                    <div className=' bg-textPrimary opacity-80 '>
                        <TabPanel value={value} index={0}>
                            <p className='text-[white] text-[15px]  lg:text-2xl'>
                                The fabric is durable, comfortable, and have a good drape.
                            </p>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <p className='text-[white] text-[15px]  lg:text-2xl'>
                                The finishing is clean, with no rough edges, and properly aligned buttons, zippers, or hooks.
                            </p>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <p className='text-[white] text-[15px] lg:text-2xl'>
                                No mater what , we're committed always deliver on time .
                            </p>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <p className='text-[white] text-[15px]  lg:text-2xl'>
                                The garment is made with sustainable and eco-friendly materials and processes.
                            </p>
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <p className='text-[white] text-[15px]  lg:text-2xl'>
                                Using the technologies to repel dirt and stains, making them easier to clean and maintain
                            </p>
                        </TabPanel>
                    </div>
                </motion.div>


            </Box>
        </Box>

    );
}