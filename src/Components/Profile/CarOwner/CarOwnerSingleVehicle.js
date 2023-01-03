import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Link } from 'react-router-dom';

export default function CarOwnerSingleVehicle({car}) {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <Link to={`/carowner-vehicle/${car?.id}`}>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItemButton
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemIcon>
                        <DirectionsCarIcon sx={{ scale: '1.3' }} />
                    </ListItemIcon >
                    <ListItemText primary={`${car?.brand} ${car?.model}`} />
                    {car?.year}
                </ListItemButton>
                <Divider />
        </Box>
        </Link>
    );
}