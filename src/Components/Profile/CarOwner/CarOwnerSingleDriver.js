import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';


export default function CarOwnerSingleDriver({driver}) {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItemButton
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemIcon>
                        <AirlineSeatReclineNormalIcon sx={{ scale: '1.3' }} />
                    </ListItemIcon >
                    <ListItemText primary={`${driver?.name}`} />
                    {driver?.phone}
                </ListItemButton>
                <Divider />
        </Box>
    );
}